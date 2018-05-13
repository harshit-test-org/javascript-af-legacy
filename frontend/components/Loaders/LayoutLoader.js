import React from 'react'
import ContentLoader from 'react-content-loader'

const LayoutLoader = props => (
  <ContentLoader height={40} width={253} speed={1} primaryColor="#f3f3f3" secondaryColor="#ecebeb" {...props}>
    <rect x="11.53" y="7.77" rx="0" ry="0" width="234.01" height="26" />
  </ContentLoader>
)

export default LayoutLoader
