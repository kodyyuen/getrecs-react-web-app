import Card from "./card";

const CardSet = ({ set, type }) => {
  return (
    <div className={`row my-3 px-1 justify-content-start row-cols-${type === "playlist" ? "1" : "2"} row-cols-md-5`}>
      {set.map((s, idx) => (
        <Card key={idx} item={s} type={type} />
      ))}
    </div>
  );
};

export default CardSet;
