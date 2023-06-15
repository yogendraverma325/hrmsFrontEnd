import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAppriciationList } from '../../api/mainApi';
import UserPosts from '../../components/UserPosts';
import UsersFeedActivity from '../../components/UsersFeedActivity';
import { RootState } from '../../redux/reducers';
import { toggleModal } from '../../redux/reducers/utilitesSlice';
import AppriciateSomeone from '../AppriciateSomeone';

const ActivityFeed = () => {
  // const [isActive, setIsActive] = useState(false);
  const { isActive } = useSelector((store: RootState) => store.utils);

  const dispatch = useDispatch();
  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: ['appriciation_list'],
    queryFn: () => fetchAppriciationList('1'),
  });

  return (
    <div className="row mr-0" style={{ width: '100%' }}>
      <div className="col-md-10" style={{ paddingRight: '0 !important' }}>
        <div className="appreciate-someone-area">
          <div
            aria-hidden={true}
            className="appreciate-btn"
            data-toggle="modal"
            data-target="#appreciateSomeoneModal"
            onClick={() => dispatch(toggleModal(true))}
          >
            <p className="p-0 m-0">
              <span>
                <img alt="oimg" src="/src/assets/images/high-quality.png" />
              </span>
              Appreciate Someone
            </p>
          </div>
          {isActive ? <AppriciateSomeone /> : null}
        </div>
        <div className="bu-filter-area">
          <div className="row">
            <div className="col-md-6">
              <p className="bu-name">
                Business Unit - <span>Shared</span>
              </p>
            </div>

            <div className="col-md-6 d-flex justify-content-end">
              <select name="buName" id="buName">
                <option value="shared">Shared</option>
                <option value="cloud">Cloud</option>
                <option value="ims">IMS</option>
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

      <div className="col-md-2 p-0">
        <div className="right-side-panel">
          <p className="wall-heading m-0">Appreciation Wall</p>
          <div className="d-flex justify-content-center">
            <select name="month-name" id="month-name">
              <option value="May 2023">May 2023</option>
              <option value="April 2023">April 2023</option>
              <option value="March 2023">March 2023</option>
              <option value="Feb">Feb 2023</option>
            </select>
          </div>

          <UsersFeedActivity />
          <UsersFeedActivity />
          <UsersFeedActivity />
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;
