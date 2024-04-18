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
import { useNavigate } from 'react-router-dom';

import {
  getGroupCompany,
  getCompanyFromGroup,
  getBUFromCompany,
  getSBUFromBuAndComapny,
  getDepartmentFromSBU,
  getFunctionalAreaFromDepartment,
} from '@/api/mainApi';

import data from './org.json';
import { useDispatch } from 'react-redux';
import { updateBreadCrum } from '@/redux/reducers/utilitesSlice';
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
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  // ...theme,
}));

function Organization({ org, onCollapse, collapsed, handleNodeClick }: any) {
  const classes = useStyles();
  const handleClick = () => {
    handleNodeClick(org);
  };
  return (
    <Card variant="outlined">
      <CssBaseline />

      <CardHeader
        variant="outlined"
        title={userObject(org, handleNodeClick)}
        onClick={handleClick}
      />

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
      <Typography
        variant="body1"
        onClick={() => {
          handleNodeClick(input);
        }}
      >
        {input?.name.charAt(0).toUpperCase() + input?.name.slice(1)}
      </Typography>
    </>
  );
};
function Account({ a, handleNodeClick }: any) {
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

function Node({ o, parent, fetchData, handleNodeClick }: any) {
  const [collapsed, setCollapsed] = React.useState(!o.collapsed);

  const handleCollapse = async () => {
    if (o.datacome === false) {
      const id = o.id;
      const data = await fetchData({ element: o.element, id: id });
      const { normalReported, hierarhcyReportee } = checkNormalChildAndOthers(
        data?.data,
        { element: o.element, id: id },
      );
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
    : (props: any) => (
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

const checkNormalChildAndOthers = (data: any, mappingType: any) => {
  const normalReported: any = [];
  const hierarhcyReportee: any = [];

  switch (mappingType.element) {
    case 'company':
      data.forEach((element: any) => {
        hierarhcyReportee.push({
          name: element.companyName,
          id: element.companyCode + '_' + element.companyId,
          datacome: false,
          child: true,
          element: 'bu',
          account: [],
          organizationChildRelationship: [],
        });
      });

      break;

    case 'bu':
      data.forEach((element: any) => {
        hierarhcyReportee.push({
          name: element.bumaster.buName,
          id: element.bumaster.buCode + '_' + element.companyId + '_' + element.buId,
          datacome: false,
          child: true,
          element: 'sbu',
          account: [],
          organizationChildRelationship: [],
        });
      });
      break;

    case 'sbu':
      data.forEach((element: any) => {
        hierarhcyReportee.push({
          name: element.bumaster.buName,
          id:
            element.bumaster.buCode +
            '_' +
            element.companyId +
            '_' +
            element.buId +
            '_' +
            element.sbuMappingId,
          datacome: false,
          child: true,
          element: 'department',
          account: [],
          organizationChildRelationship: [],
        });
      });
      break;
    case 'department':
      data.forEach((element: any) => {
        hierarhcyReportee.push({
          name: element.departmentmaster.departmentName,
          id:
            element.departmentmaster.departmentCode +
            '_' +
            element.sbuMappingId +
            '_' +
            element.departmentMappingId,
          datacome: false,
          child: true,
          element: 'functionalArea',
          account: [],
          organizationChildRelationship: [],
        });
      });
      break;
    case 'functionalArea':
      data.forEach((element: any) => {
        normalReported.push({
          name: element.functionalareamaster.functionalAreaName,
          id:
            element.functionalareamaster.functionalAreaCode +
            '_' +
            element.departmentMappingId +
            '_' +
            element.functionalAreaMappingId,
          child: false,
        });
      });
      break;
  }
  return {
    normalReported,
    hierarhcyReportee,
  };
};

const FunctionalStructure = (props: any) => {
  const { userId } = props;
  const [userData, setUserData] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(
      updateBreadCrum({
        breadCrum: 'Functional Structure', //
      }),
    );

    const fetchDataWrapper = async (input: any) => {
      setUserData(await fetchData(input));
    };

    fetchDataWrapper({ element: 'group', id: 0 });
  }, []);

  const fetchData = async (input: any) => {
    let response = null;
    switch (input.element) {
      case 'group':
        response = await getGroupCompany();
        break;

      case 'company':
        response = await getCompanyFromGroup(input.id);
        break;

      case 'bu':
        response = await getBUFromCompany(input.id);
        break;

      case 'sbu':
        response = await getSBUFromBuAndComapny(input);
        break;
      case 'department':
        response = await getDepartmentFromSBU(input);
        break;
      case 'functionalArea':
        response = await getFunctionalAreaFromDepartment(input);
        break;
    }
    return response;
  };

  const prepareData = (inputData: any) => {
    return {
      name: inputData.data[0].groupCode,
      id: inputData.data[0].groupCode + '_' + inputData.data[0].groupId,
      datacome: false,
      child: true,
      element: 'company',
      account: [],
      organizationChildRelationship: [],
    };
  };

  const handleNodeClick = (inputData: any) => {
    console.log('inputData', inputData);
    // window.open(`/profile/${inputData.id}`, '_blank');
  };

  return (
    <>
      {userData && (
        <Box bgcolor="background" padding={4}>
          <DndProvider backend={HTML5Backend}>
            {/* <PerfectScrollbar
              component="div"
              style={{
                height: 'auto',
                overflowY: 'auto',
              }}
            > */}
            <Node
              o={prepareData(userData)}
              fetchData={fetchData}
              handleNodeClick={handleNodeClick}
            />
            {/* </PerfectScrollbar> */}
          </DndProvider>
        </Box>
      )}
    </>
  );
};

export default FunctionalStructure;
