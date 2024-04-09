import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import { Box, CssBaseline, Tooltip, Typography } from '@mui/material';
import { Badge, Card, CardHeader, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import _ from 'lodash';
import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Tree, TreeNode } from 'react-organizational-chart';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useNavigate } from 'react-router-dom';
import { date } from 'yup';

import { getHierarchy } from '@/api/mainApi';
import { Reportie } from '@/models/feed';

import data from './org.json';
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

function Organization({ org, onCollapse, collapsed, handleNodeClick }) {
  const classes = useStyles();
  const handleClick = () => {
    handleNodeClick(org);
  };
  return (
    <Card variant="outlined">
      <CssBaseline />

      <CardHeader variant="outlined" title={userObject(org)} onClick={handleClick} />

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

const userObject = (input: any, handleNodeClick: any) => {
  return (
    <>
      <AccountCircleOutlinedIcon style={{ fontSize: 40, width: 40, height: 40 }} />
      <Typography
        variant="body1"
        onClick={() => {
          handleNodeClick(input);
        }}
      >
        {input?.name.charAt(0).toUpperCase() + input?.name.slice(1)}
      </Typography>
      <Typography variant="body2">({input?.designation})</Typography>
    </>
  );
};
function Account({ a, handleNodeClick }) {
  const classes = useStyles();

  return (
    <Card
      variant="outlined"
      className={classes.root}
      sx={{ minHeight: '98px', maxHeight: 'auto' }}
    >
      <CardHeader title={<>{userObject(a, handleNodeClick)}</>} id={a.name}></CardHeader>
    </Card>
  );
}

function Node({ o, parent, fetchData, handleNodeClick }) {
  const [collapsed, setCollapsed] = React.useState(!o.collapsed);

  const handleCollapse = async () => {
    if (o.datacome === false) {
      const id = o.id;
      const data = await fetchData(id);
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
      label={
        <Organization
          org={o}
          onCollapse={handleCollapse}
          collapsed={collapsed}
          handleNodeClick={handleNodeClick}
        />
      }
    />
  ) : (
    <T
      label={
        <Organization
          org={o}
          onCollapse={handleCollapse}
          collapsed={collapsed}
          handleNodeClick={handleNodeClick}
        />
      }
    >
      {_.map(o.account, (a) => (
        <TreeNode
          key={a.id}
          label={<Account a={a} handleNodeClick={handleNodeClick} />}
        />
      ))}
      {_.map(o.organizationChildRelationship, (c) => (
        <Node
          key={c.id}
          o={c}
          parent={o}
          fetchData={fetchData}
          handleNodeClick={handleNodeClick}
        />
      ))}
    </T>
  );
}

const checkNormalChildAndOthers = (data) => {
  const normalReported = [];
  const hierarhcyReportee = [];

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

const OrgStructure = (props: any) => {
  const { userId } = props;
  const [userData, setUserData] = React.useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDataWrapper = async (userId) => {
      setUserData(await fetchData(userId));
    };

    fetchDataWrapper(userId);
  }, []);

  const fetchData = async (UserId: number) => {
    const response = await getHierarchy(UserId);
    return response;
  };

  const prepareData = (inputData: any) => {
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

  const handleNodeClick = (inputData: any) => {
    window.open(`/profile/${inputData.id}`, '_blank');
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
              <Node
                o={prepareData(userData)}
                fetchData={fetchData}
                handleNodeClick={handleNodeClick}
              />
            </PerfectScrollbar>
          </DndProvider>
        </Box>
      )}
    </>
  );
};

export default OrgStructure;
