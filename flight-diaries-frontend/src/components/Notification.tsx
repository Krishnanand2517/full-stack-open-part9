const Notification = ({ errMsg }: { errMsg: string }) => {
  return (
    <div>
      <p style={{ color: "red" }}>{errMsg}</p>
    </div>
  );
};

export default Notification;
