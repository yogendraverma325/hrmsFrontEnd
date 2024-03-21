import React, { useEffect } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import _ from 'lodash';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PerfectScrollbar from 'react-perfect-scrollbar';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import data from './org.json';
import { makeStyles } from '@material-ui/core/styles';
import { Reportie } from '@/models/feed';
import './structure.css';

const useStyles = makeStyles((theme) => ({
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

function Organization({ org, onCollapse, collapsed }) {
  const classes = useStyles();

  return (
    <Card variant="outlined">
      <CardHeader
        avatar={
          <Tooltip
            title={`${_.size(org.organizationChildRelationship)} Sub Profile`}
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

function Account({ a }) {
  const classes = useStyles();
  return (
    <Card variant="outlined" className={classes.root}>
      <CardHeader avatar={<></>} title={a.name} />
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

  useEffect(() => {
    const defaultUserId = 31;
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
    const { normalReported, hierarhcyReportee } = checkNormalChildAndOthers(
      inputData?.data,
    );
    return {
      tradingName: inputData?.data.name,
      id: inputData?.data.id,
      datacome: false,
      account: normalReported,
      organizationChildRelationship: hierarhcyReportee,
    };
  };

  return (
    <PerfectScrollbar
      component="div"
      style={{
        height: '500px',
      }}
    >
      {data && (
        <DndProvider backend={HTML5Backend}>
          <Node o={data} fetchData={fetchData} />
        </DndProvider>
      )}
    </PerfectScrollbar>
  );
}

export default OrgStructure;
