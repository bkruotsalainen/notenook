function Memo(props: MemoProps) {

  const getDate = () => {
    const dateTime = new Date(props.memo.createdAt);

    const day = dateTime.getDate();
    const month = dateTime.getMonth();
    const year = dateTime.getFullYear();

    const hours = (dateTime.getHours() < 10 ? '0' : '') + dateTime.getHours();
    const minutes = (dateTime.getMinutes() < 10 ? '0' : '') + dateTime.getMinutes();

    return day + '.' + month + '.' + year + ' ' + hours + ':' + minutes; 
  };

  return (
    <>
      <div className="memoWrapper">
        <h3>{props.findTag(props.memo.tag)} {props.memo.title}</h3>
        <span style={{fontSize: '0.8em'}}>{getDate()}</span>
        <p>{props.memo.content}</p>
      </div>
    </>
  );
}

export default Memo;