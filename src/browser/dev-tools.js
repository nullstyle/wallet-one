import React from 'react';
import {
	Paper, List, ListItem,
} from "material-ui";

import ActionDone from "material-ui/lib/svg-icons/action/done";

const style = {
	flex:          1,
	maxWidth:      400,
	height:        "100%",
	display:       "flex",
	flexDirection: "column",
	zIndex:        10,
	padding:       5,
};

export default class DevTools extends React.Component {
  render() {
    return <Paper id="devtools" zDepth={3} style={style}>
		<List subheader="Developer Tools">
		  <ListItem
		    primaryText="Run Tests"
		    leftIcon={<ActionDone />}
		    initiallyOpen={false}
		    nestedItems={[
		      <ListItem primaryText="Actions Only" leftIcon={<ActionDone />} />,
		      <ListItem primaryText="Components Only" leftIcon={<ActionDone />} />,
		      <ListItem primaryText="Reducers Only" leftIcon={<ActionDone />} />,
		      <ListItem primaryText="Units Only" leftIcon={<ActionDone />} />,
		    ]}
		  />
		</List>
		</Paper>;
  }
}
