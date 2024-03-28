import React, { useEffect } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import _ from 'lodash';
import clsx from 'clsx';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PerfectScrollbar from 'react-perfect-scrollbar';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import data from './org.json';
import { makeStyles } from '@mui/styles';
import { Reportie } from '@/models/feed';

import { getHierarchy } from '@/api/mainApi';
import { Box, CssBaseline, Tooltip, Typography } from '@mui/material';
import { Badge, Card, CardHeader, IconButton } from '@mui/material';
import { date } from 'yup';
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
  // ...theme,
}));

function Organization({ org, onCollapse, collapsed }) {
  const classes = useStyles();
  console.log('org', org);
  return (
    <Card variant="outlined">
      <CssBaseline />

      <CardHeader variant="outlined" title={userObject(org)} />

      <IconButton
        size="small"
        onClick={onCollapse}
        className={clsx(classes.expand, {
          [classes.expandOpen]: !collapsed,
        })}
      >
        {org.child > 0 && <KeyboardArrowUpOutlinedIcon />}
      </IconButton>
    </Card>
  );
}

const userObject = (input: any) => {
  return (
    <>
      <AccountCircleOutlinedIcon style={{ fontSize: 40, width: 40, height: 40 }} />
      <Typography variant="body1">
        {input?.name.charAt(0).toUpperCase() + input?.name.slice(1)}
      </Typography>
      <Typography variant="body2">({input?.designation})</Typography>
    </>
  );
};
function Account({ a }) {
  console.log('acount', a);
  const classes = useStyles();
  return (
    <Card
      variant="outlined"
      className={classes.root}
      sx={{ minHeight: '98px', maxHeight: 'auto' }}
    >
      <CardHeader title={<>{userObject(a)}</>}></CardHeader>
    </Card>
  );
}

function Node({ o, parent, fetchData }) {
  const [collapsed, setCollapsed] = React.useState(!o.collapsed);

  const handleCollapse = async () => {
    if (o.datacome === false) {
      const id = o.id;
      let data = await fetchData(id);
      const { normalReported, hierarhcyReportee } = checkNormalChildAndOthers(data?.data);
      o.account = normalReported;
      o.organizationChildRelationship = hierarhcyReportee;
      o.datacome = true;
    }

    setCollapsed(!collapsed);
  };

  React.useEffect(() => {
    o.collapsed = collapsed;
  });

  const T = parent
    ? TreeNode
    : (props) => (
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
        <TreeNode key={a.id} label={<Account a={a} />} />
      ))}
      {_.map(o.organizationChildRelationship, (c) => (
        <Node key={c.id} o={c} parent={o} fetchData={fetchData} />
      ))}
    </T>
  );
}

const checkNormalChildAndOthers = (data) => {
  let normalReported = [];
  let hierarhcyReportee = [];

  data.reportie.forEach((element) => {
    if (element.reportings === true) {
      hierarhcyReportee.push({
        name: element.name,
        designation: element.designationmaster.name,
        id: element.id,
        datacome: false,
        account: [],
        child: true,
        organizationChildRelationship: [],
      });
    } else {
      normalReported.push({
        name: element.name,
        id: element.id,
        child: false,
        designation: element.designationmaster.name,
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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userData'));
    const defaultUserId = user.id;
    const fetchDataWrapper = async (defaultUserId) => {
      setUserData(await fetchData(defaultUserId));
    };

    fetchDataWrapper(defaultUserId);
  }, []);

  const fetchData = async (UserId) => {
    const response = await getHierarchy(UserId);
    return response;
  };

  const prepareData = (inputData) => {
    console.log('inputData', inputData);
    const { normalReported, hierarhcyReportee } = checkNormalChildAndOthers(
      inputData?.data,
    );
    return {
      name: inputData?.data.name,
      designation: inputData?.data?.designationmaster?.name,
      id: inputData?.data.id,
      datacome: false,
      child: normalReported.length > 0 || hierarhcyReportee.length > 0 ? true : false,
      account: normalReported,
      organizationChildRelationship: hierarhcyReportee,
    };
  };

  return (
    <>
      {userData && (
        <Box bgcolor="background" padding={4}>
          <DndProvider backend={HTML5Backend}>
            <PerfectScrollbar
              component="div"
              style={{
                height: 'auto',
              }}
            >
              <Node o={prepareData(userData)} fetchData={fetchData} />
            </PerfectScrollbar>
          </DndProvider>
        </Box>
      )}
    </>
  );
}

export default OrgStructure;
