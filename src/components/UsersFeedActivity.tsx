const UsersFeedActivity = () => {
  return (
    <div className="appreciation-wall-card">
      <div className="row">
        <div className="col-md-2">
          <img
            alt="img"
            className="wall-prof"
            src="/src/assets/images/prof-img-appr.png"
          />
        </div>
        <div className="col-md-10">
          <span className="wall-name">@ankit.singh</span>
          <p className="wall-appr-name m-0">Diamond Appreciation</p>

          <span className="wall-see-more">See more</span>
        </div>
      </div>
    </div>
  );
};

export default UsersFeedActivity;
