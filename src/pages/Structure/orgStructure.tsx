import React, { useEffect } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import _, { forEach } from 'lodash';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import { getEmployees, getHierarchy } from '../../api/mainApi';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrag, useDrop } from 'react-dnd';
import organization from './org.json';
import PerfectScrollbar from 'react-perfect-scrollbar';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';

import { makeStyles } from '@material-ui/core/styles';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Reportie, ReportiesListResponse } from '@/models/feed';
const useStyles = makeStyles((theme) => ({
  root: {},
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
}));
function Organization({ org, onCollapse, collapsed }: any) {
  const classes = useStyles();

  return (
    <Card variant="outlined">
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
  return (
    <Card variant="outlined" className={classes.root}>
      <CardHeader avatar={<></>} title={a.name} />
    </Card>
  );
}
function findOrganizationNode(rootNode: any, tradingName: any) {
  if (rootNode.id === tradingName) {
    return rootNode;
  } else if (rootNode.organizationChildRelationship) {
    for (const childNode of rootNode.organizationChildRelationship) {
      const foundNode = findOrganizationNode(childNode, tradingName);
      if (foundNode) {
        return foundNode;
      }
    }
  }
  return null;
}

function Node({ o, parent, fetchData }: any) {
  const [collapsed, setCollapsed] = React.useState(o.collapsed);

  const handleCollapse = async () => {
    if (o.datacome == false) {
      const id = o.id;
      let data = await fetchData(id);
      const { normalReported, hierarhcyReportee } = checkNormalChildAndOthers(data?.data);
      o.account = normalReported;
      o.organizationChildRelationship = hierarhcyReportee;
      // Push the new user data into the 'account' array
      o.datacome = true;
    }

    setCollapsed(!collapsed);
  };
  React.useEffect(() => {
    o.collapsed = collapsed;
  });
  const T = parent
    ? TreeNode
    : (props: any) => (
        <Tree {...props} lineWidth={'2px'} lineColor={'#bbc'} lineBorderRadius={'20%'}>
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
        <Node o={c} parent={o} fetchData={fetchData} />
      ))}
    </T>
  );
}
const checkNormalChildAndOthers = (data: any) => {
  let normalReported: any = [];
  let hierarhcyReportee: any = [];

  data.reportie.forEach((element: Reportie) => {
    if (element.reportings == true) {
      hierarhcyReportee.push({
        tradingName: element.name,
        id: element.id,
        datacome: false,
        account: [],
        organizationChildRelationship: [],
      });
    } else {
      normalReported.push({
        name: element.name,
        id: element.id,
      });
    }
  });
  return {
    normalReported,
    hierarhcyReportee,
  };
};
function OrgStructure() {
  const [userData, setUserData] = React.useState(null);
  let serverData = {};

  const prepareData = (inputData: any) => {
    const { normalReported, hierarhcyReportee } = checkNormalChildAndOthers(
      inputData?.data,
    );
    serverData = {
      tradingName: inputData?.data.name,
      id: inputData?.data.id,
      datacome: true,
      account: normalReported,
      organizationChildRelationship: hierarhcyReportee,
    };
    return serverData;
  };

  let defaultUserId = 31;
  useEffect(() => {
    const fetchDataWrapper = async (defaultUserId: number) => {
      setUserData(await fetchData(defaultUserId));
    };

    fetchDataWrapper(defaultUserId);
  }, [defaultUserId]);

  const fetchData = async (UserId: number) => {
    const response = await getHierarchy(UserId);
    return response;
  };

  return (
    <div>
      <PerfectScrollbar
        component="div"
        style={{
          height: '500px',
        }}
      >
        {userData && (
          <DndProvider backend={HTML5Backend}>
            <Node o={prepareData(userData)} fetchData={fetchData} />
          </DndProvider>
        )}
      </PerfectScrollbar>
    </div>
  );
}

export default OrgStructure;
