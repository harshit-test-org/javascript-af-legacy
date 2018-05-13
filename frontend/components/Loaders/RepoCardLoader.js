import React from 'react'
import ContentLoader from 'react-content-loader'

const RepoCardLoader = props => (
  <ContentLoader height={250} width={250} speed={1} primaryColor="#f3f3f3" secondaryColor="#ecebeb" {...props}>
    <rect x="14.5" y="17.27" rx="0" ry="0" width="190" height="21" />
    <rect x="14.5" y="55.27" rx="0" ry="0" width="220" height="8" />
    <rect x="14.5" y="76.27" rx="0" ry="0" width="220" height="8" />
    <rect x="14.5" y="97.27" rx="0" ry="0" width="220" height="8" />
    <rect x="14.5" y="159.27" rx="0" ry="0" width="220" height="8" />
    <rect x="14.5" y="140.27" rx="0" ry="0" width="220" height="8" />
    <rect x="14.5" y="117.27" rx="0" ry="0" width="220" height="8" />
    <circle cx="31.932646928465935" cy="216.17264692846595" r="20.402646928465938" />
    <circle cx="160.94264692846593" cy="216.17264692846595" r="20.402646928465938" />
    <rect x="65.54" y="210.77" rx="0" ry="0" width="36" height="10" />
    <rect x="191.54" y="208.77" rx="0" ry="0" width="30" height="9" />
  </ContentLoader>
)

export default RepoCardLoader
