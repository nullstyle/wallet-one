import React from 'react';
import {
	List, ListItem, Badge
} from "material-ui";

import SuccessIcon from "material-ui/lib/svg-icons/action/done";
import FailureIcon from "material-ui/lib/svg-icons/content/clear";
import PendingIcon from "material-ui/lib/svg-icons/av/pause-circle-outline";
import RunningIcon from "material-ui/lib/svg-icons/action/cached";
import SkippedIcon from "material-ui/lib/svg-icons/communication/call-missed";
import colors from 'material-ui/lib/styles/colors';

import {reduce, any, map} from 'lodash';

const NoIcon = (props) => <div />;


export const SpecMenu = (props) => {
  let {cases, onTouchTap} = props;
  let categories = buildCategories(cases);
  let icon = statusIcon(cases);
  let color = statusColor(cases);
  let nested = map(categories, (cases, name) => {
    return <SpecCategory
      key={name}
      name={name}
      cases={cases}
      onTouchTap={() => onTouchTap(name)} />
  });

	if (!any(cases)) {
		return <ListItem
			primaryText = "No Specs Found"
			leftIcon={<NoIcon />}
			disabled={true}
			/>;
	}

  return <ListItem
	    primaryText="Run All Specs"
	    leftIcon={icon}
	    initiallyOpen={false}
	    nestedItems={nested}
      onTouchTap={() => onTouchTap()}
      style={{color: color}}
	  />;
}

export const SpecReport = (props) => {
	let {cases} = props;
	let summary = reduce(cases, (acc, c) => {
		let status = c.status || 'skipped';
		let cases = acc[status] || [];
		cases.push(c);
		acc[status] = cases;
		return acc;
	}, {});

	let icon = any(summary.running) ? <RunningIcon /> : <NoIcon />;

	return <ListItem leftIcon={icon}>
		<SuccessIcon />
		<FailureIcon />
		<SkippedIcon />
		<PendingIcon />
	</ListItem>
}

const SpecCategory = (props) => {
  let {name, cases, onTouchTap} = props;
  let icon = statusIcon(cases);
  let color = statusColor(cases);

  return  <ListItem
    primaryText={name + "s Only"}
    leftIcon={icon}
    onTouchTap={onTouchTap}
    style={{color: color}}
    />;
}

function statusIcon(cases) {
  let color = statusColor(cases);
  if (any(cases, {status:'running'})) {
    return <RunningIcon color={color}/>;
  }

  if (any(cases, {status:'failed'})) {
    return  <FailureIcon color={color}/>;
  }

  if (any(cases, {status:'success'})) {
    return  <SuccessIcon color={color}/>;
  }

  return <NoIcon />;
}

function statusColor(cases) {
  if (any(cases, {status:'failed'})) {
    return  colors.redA200;
  }
  if (any(cases, {status:'pending'})) {
    return  colors.yellow600;
  }
  if (any(cases, {status:'success'})) {
    return  colors.green400;
  }
  return "inherit";
}

function buildCategories(cases) {
  return reduce(cases, (acc, c) => {
    let cases = acc[c.category] || [];
    cases.push(c);
    acc[c.category] = cases;
    return acc;
  }, {});
}
