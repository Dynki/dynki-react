import loadable from "@loadable/component";

const DynamicIcon = loadable(props => {
  console.log('props.type', props.type);

  return import(`@ant-design/icons/es/icons/${props.type}.js`)
    .catch(err => import(`@ant-design/icons/es/icons/WarningOutlined.js`))
}, {
  cacheKey: props => props.type,
})

export default DynamicIcon;