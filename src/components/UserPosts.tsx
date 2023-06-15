import { Alert, Grid } from '@mui/material';
import moment from 'moment';

import { AppreciationListResponse } from '../models/feed';
interface Props {
  data: AppreciationListResponse;
}

const UserPosts: React.FC<Props> = ({ data }) => {
  console.log('In Component', data);

  const appriciationCategoryAssets: any = {
    patinum: '/src/assets/images/platinum-trophy.png',
    diamon: '/src/assets/images/diamond-trophy.png',
    silver: '/src/assets/images/silver-trophy.png',
    gold: '/src/assets/images/gold-trophy.png',
  };
  const appriciationCategory: any = {
    patinum: 'Platinum',
    diamond: 'Diamond',
    silver: 'Silver',
    gold: 'Gold',
  };
  return (
    <>
      {data.data.rows.length === 0 ? (
        <Grid container>
          <Grid item lg={12} md={12}>
            <Alert severity="info">No posts available</Alert>
          </Grid>
        </Grid>
      ) : null}
      {data.data.rows.map((post, key) => (
        <div key={key} className="appreciation-post">
          <div className="row">
            <div className="col-md-9">
              <div className="appreciator-info">
                <p className="p-0 m-0">
                  <span className="mr-1">
                    <img alt="profile_img" src="/src/assets/images/prof-img-appr.png" />
                  </span>
                  <span>
                    <i className="las la-long-arrow-alt-right"></i>
                  </span>
                  <span className="ml-1">
                    <img alt="profile_img" src="/src/assets/images/prof-img-appr.png" />
                  </span>
                </p>

                <p className="m-0">
                  <span className="appreciation-date">
                    {moment(post.created_at).format('MMMM D, YYYY - HH:mm')}
                  </span>
                </p>

                <p className="appreciation-cat-name m-0">
                  {appriciationCategory[post.category]} Appreciation
                </p>
                <p className="appreciation-text m-0">
                  <span>{post.receiver_name}</span>{' '}
                  <span>received appreciation from </span>{' '}
                  <span> {post.sender_name} </span> <span>:</span>
                  <span>{post.message}</span>
                </p>
                <span className="appreciation-count">10+</span>
              </div>
            </div>

            <div className="col-md-3">
              <div className="appreciation-extras">
                <div className="shield">
                  <img
                    alt="dimond_trophy"
                    src={appriciationCategoryAssets[post.category]}
                  />
                </div>
                <div className="likes-comments">
                  <p className="d-flex align-items-end m-0">
                    <span className="mx-2">{post.ap_responses.length} comments</span>{' '}
                    <span className="mx-2">{post.ap_like_posts.length} likes</span>
                    <span>
                      <img alt="like" src="/src/assets/images/like.png" />
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row" style={{ width: '100%' }}>
            <div className="comment-area">
              <span>
                {' '}
                <img alt="profile_img" src="/src/assets/images/prof-img-appr.png" />
              </span>
              <span className="add-cmnt">Add Comment</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default UserPosts;
