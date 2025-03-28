const Advertisement = ({ link, content }) => {
  return (
    <div className="ad_item flex items-center p-2 mx-1 my-2 hover:bg-gray-100 rounded-md">
      <div className="img max-w-[40%] h-max overflow-hidden rounded-md">
        <img src={link} alt="ad" />
      </div>
      <div className="ad-content pl-3 m-2">
        <span className="text-sm  text-center">{content}</span>
      </div>
    </div>
  );
};

export default Advertisement;
