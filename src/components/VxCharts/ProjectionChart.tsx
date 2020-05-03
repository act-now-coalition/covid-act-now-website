import React from 'react';

const ProjectionChart = ({
  width = 800,
  height = 600,
}: {
  width: number;
  height: number;
}) => {
  return <svg width={width} height={height}></svg>;
};

export default ProjectionChart;
