import React from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import _ from 'lodash';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrag, useDrop } from 'react-dnd';
import organization from './org.json';

import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

import { makeStyles, ThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'white',
    display: 'inline-block',
    borderRadius: 16,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginTop: -10,
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.short,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: '#ECECF4',
  },
}));
function Organization({ org, onCollapse, collapsed }: any) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'account',
    drop: () => ({ name: org.tradingName }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const isActive = canDrop && isOver;
  let backgroundColor = 'white';
  if (isActive) {
    backgroundColor = '#ddffd2';
  } else if (canDrop) {
    backgroundColor = '#ffeedc';
  }
  return (
    <Card
      variant="outlined"
      className={classes.root}
      ref={drop}
      style={{ backgroundColor }}
    >
      <CardHeader
        avatar={
          <Tooltip
            title={`${_.size(
              org.organizationChildRelationship,
            )} Sub Profile} Sub Account`}
            arrow
          >
            <Badge
              style={{ cursor: 'pointer' }}
              color="secondary"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              showZero
              invisible={true}
              overlap="circle"
              onClick={onCollapse}
            ></Badge>
          </Tooltip>
        }
        title={org.tradingName}
      />

      <IconButton
        size="small"
        onClick={onCollapse}
        className={clsx(classes.expand, {
          [classes.expandOpen]: !collapsed,
        })}
      >
        <KeyboardArrowUpOutlinedIcon />
      </IconButton>
    </Card>
  );
}
function Account({ a }: any) {
  const classes = useStyles();
  const [{ isDragging }, drag] = useDrag({
    item: { name: a.name, type: 'account' }, // Provide a 'type' property here
    type: 'account', // Add type property here
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        alert(`You moved ${item.name} to ${item.name}`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;
  return (
    <Card
      variant="outlined"
      className={classes.root}
      ref={drag}
      style={{ cursor: 'pointer', opacity }}
    >
      <CardHeader avatar={<></>} title={a.name} />
    </Card>
  );
}
function Node({ o, parent }: any) {
  const [collapsed, setCollapsed] = React.useState(o.collapsed);
  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };
  React.useEffect(() => {
    o.collapsed = collapsed;
  });
  const T = parent
    ? TreeNode
    : (props: any) => (
        <Tree {...props} lineWidth={'2px'} lineColor={'#bbc'} lineBorderRadius={'12px'}>
          {props.children}
        </Tree>
      );
  return collapsed ? (
    <T
      label={<Organization org={o} onCollapse={handleCollapse} collapsed={collapsed} />}
    />
  ) : (
    <T label={<Organization org={o} onCollapse={handleCollapse} collapsed={collapsed} />}>
      {_.map(o.account, (a) => (
        <TreeNode label={<Account a={a} />}></TreeNode>
      ))}
      {_.map(o.organizationChildRelationship, (c) => (
        <Node o={c} parent={o} />
      ))}
    </T>
  );
}
function OrgStructure() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Node o={organization} />
    </DndProvider>
  );
}

export default OrgStructure;
