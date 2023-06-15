import { useQuery } from '@tanstack/react-query';

import { fetchAppriciationList } from '../../api/mainApi';
import TeamFeedActivity from '../../components/TeamFeedActivity';
import UserPosts from '../../components/UserPosts';

const AppriciationActivity = () => {
  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: ['appriciation_list'],
    queryFn: () => fetchAppriciationList('1'),
  });

  return (
    <div className="row mr-0" style={{ width: '100%' }}>
      <div className="col-md-10" style={{ paddingRight: '0 !important' }}>
        <div className="given-received-area">
          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <button
                className="rec-giv-btns nav-link active"
                id="nav-rec-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-received"
                type="button"
                role="tab"
                aria-controls="nav-received"
                aria-selected="true"
              >
                Received
              </button>
              <button
                className="rec-giv-btns nav-link"
                id="nav-giv-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-given"
                type="button"
                role="tab"
                aria-controls="nav-given"
                aria-selected="false"
              >
                Given
              </button>
              {/* <span className="rec-giv-btns active">Received</span>
              <span className="rec-giv-btns">Given</span> */}
            </div>
          </nav>
        </div>
        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="nav-received"
            role="tabpanel"
            aria-labelledby="nav-rec-tab"
            tabIndex={0}
          >
            <div className="bu-filter-area">
              <div className="row">
                <div className="col-md-6"></div>

                <div className="col-md-6 d-flex justify-content-end">
                  <select name="buName" id="buName">
                    <option value="shared">May 2023</option>
                    <option value="cloud">April 2023</option>
                    <option value="ims">March 2023</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="feed-area">
              <div className="row">
                <div className="col-md-12">
                  {isSuccess ? <UserPosts data={data} /> : null}
                </div>
              </div>
            </div>
          </div>

          <div
            className="tab-pane fade"
            id="nav-given"
            role="tabpanel"
            aria-labelledby="nav-giv-tab"
            tabIndex={0}
          >
            ...
          </div>
        </div>
      </div>

      <div className="col-md-2 p-0">
        <div className="right-side-panel">
          <p className="wall-heading m-0">My Team Members</p>
          <div className="d-flex justify-content-center">
            <div
              className="row d-flex justify-content-between mt-2 mb-2"
              style={{ width: '100%' }}
            >
              <div className="p-0 searchinput">
                <input className="search-bar" type="text" style={{ width: '100%' }} />
              </div>
              <div className="d-flex justify-content-center align-items-center search-ico">
                <i className="las la-search"></i>
              </div>
            </div>
          </div>

          <TeamFeedActivity />
          <TeamFeedActivity />
          <TeamFeedActivity />
          <TeamFeedActivity />
          <TeamFeedActivity />
          <TeamFeedActivity />
          <TeamFeedActivity />
          <TeamFeedActivity />
          <TeamFeedActivity />
        </div>
      </div>
    </div>
  );
};

export default AppriciationActivity;
