import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { motion } from "framer-motion";
// import { Tooltip } from "react-tooltip";
import { PortableText } from "@portabletext/react";
import { BasicAccordion } from "../../components";
import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

import "./Skills.scss";

const Skills = () => {
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const query = '*[_type == "experiences"]';
    const skillsQuery = '*[_type == "skills"]';

    client.fetch(query).then((data) => {
      data.sort((a, b) => (a.year < b.year ? 1 : b.year < a.year ? -1 : 0));
      console.log(data);
      setExperiences(data);
    });

    client.fetch(skillsQuery).then((data) => {
      setSkills(data);
    });
  }, []);

  return (
    <>
      <h2 className="head-text">Skills & Experiences</h2>

      <div className="app__skills-container">
        {/* Experiences
        <div className="app__skills-exp">
          <h2>Work Experiences</h2>
          <hr style={{width: "100%", marginBottom: "20px"}} />
          {experiences.map((experience, index) => (
            <div key={index}>
              <p>{experience.year}</p>

              {experience.works.map((work, index) => (
                <div key={index}>
                  <h4 className="bold-text">{work.name}</h4>
                  <p className="p-text" style={{fontWeight:'500'}}>{work.company}</p>
                  <hr style={{width: '100%'}} />
                  <p className="p-text">{work.desc}</p>
                  <br/>
                </div> 
              ))}

            </div>
            // <BasicAccordion key={index} summary={experience.year} works={experience.works}/> 
          ))}

          <Button style={{marginTop: '20px'}} variant="contained" href="https://drive.google.com/file/d/1ayUREM4giSmRGUtLeAKBx5iRtmHAlME5/view?usp=sharing" target="_blank">Check My Resume</Button>
          <Button style={{marginTop: '10px'}} variant="outlined" href="https://linkedin.com/in/patricklouisw" target="_blank">Check My LinkedIn</Button>
        </div> */}
        <div className="app__skills-exp">
          {experiences.map((experience, index) => (
            <div key={index}>
              <motion.div
                className="app__skills-exp-item"
                key={experience.year}
              >
                <div className="app__skills-exp-year">
                  <p className="bold-text">{experience.year}</p>
                </div>
              </motion.div>

              <motion.div className="app__skills-exp-works">
                {experience.works.map((work) => (
                  <motion.div
                    whileInView={{ opacity: [0, 1] }}
                    transition={{ duration: 0.5 }}
                    className="app__skills-exp-work"
                    data-tip
                    data-for={work.name}
                    key={work.name}
                  >
                    <h4 className="bold-text">{work.name}</h4>
                    <p className="p-text">
                      <span>{work.duration}</span> | {work.company}
                    </p>
                    <div className="portable-text">
                      <PortableText value={work.desc} />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
          <div className="app__buttons">
            <Button
              variant="contained"
              href="https://drive.google.com/drive/folders/1UqcRf-IihUP8R7WfSniKt_3pILeecZq8?usp=sharing"
              target="_blank"
            >
              Check My Resume
            </Button>
            <Button
              variant="outlined"
              href="https://linkedin.com/in/patricklouisw"
              target="_blank"
            >
              Check My LinkedIn
            </Button>
          </div>
        </div>

        {/* Skill Bubble */}
        <motion.div className="app__skills-list">
          <h2 style={{ marginTop: "2em" }}>Skills</h2>
          <hr style={{ width: "100%", marginBottom: "20px" }} />
          {skills.map((skill) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
              key={"skill-" + skill.name}
            >
              <div
                className="app__flex"
                style={{ backgroundColor: skill.bgColor }}
              >
                <img src={urlFor(skill.icon)} alt={skill.name} />
              </div>
              <p className="p-text">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Skills, "app__skills"),
  "skills",
  "app__whitebg"
);
