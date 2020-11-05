import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const H2 = styled.h2`
  margin-top: 0;
  margin-bottom: 20px;

  text-align: center;

  font-size: 18px;
  font-weight: 600;
  line-height: 22px;
`;
const SectionDiv = styled.div`
  /* display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between; */
`;

const Section = ({ title, children }) => {
  return (
    <div>
      <H2>{title}</H2>
      <SectionDiv>{children}</SectionDiv>
    </div>
  );
};

export default Section;

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element.isRequired,
};

Section.defaultProps = {
  title: "Title template",
};
