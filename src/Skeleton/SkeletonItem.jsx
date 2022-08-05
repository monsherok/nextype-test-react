import React from "react"
import ContentLoader from "react-content-loader"

const SkeletonItem = (props) => (
  <ContentLoader 
    speed={2}
    width={320}
    height={470}
    viewBox="0 0 320 470"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="80" y="9" rx="0" ry="0" width="3" height="8" /> 
    <rect x="1" y="1" rx="0" ry="0" width="318" height="320" /> 
    <rect x="32" y="346" rx="0" ry="0" width="259" height="24" /> 
    <rect x="32" y="375" rx="0" ry="0" width="259" height="24" /> 
    <rect x="32" y="404" rx="0" ry="0" width="259" height="24" />
  </ContentLoader>
)

export default SkeletonItem;