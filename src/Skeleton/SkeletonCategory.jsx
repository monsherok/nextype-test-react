import React from "react"
import ContentLoader from "react-content-loader";


const SkeletonCategory = (props) => (
  <ContentLoader 
    speed={2}
    width={370}
    height={30}
    viewBox="0 0 370 30"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="5" ry="5" width="83" height="26" /> 
    <rect x="80" y="9" rx="0" ry="0" width="3" height="8" /> 
    <rect x="122" y="1" rx="5" ry="5" width="83" height="26" /> 
    <rect x="244" y="0" rx="5" ry="5" width="83" height="26" />
  </ContentLoader>
)

export default SkeletonCategory;
