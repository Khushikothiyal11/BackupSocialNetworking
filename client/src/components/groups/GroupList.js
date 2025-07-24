import GroupItem from "./GroupItems";
import "bootstrap/dist/css/bootstrap.min.css";

const groups = [
  {
    name: "DevUnion",
    description:
      "Where sharp minds sync up to build, solve, and grow together in tech.",
  },
  {
    name: "404 Found",
    description:
      " A crew of misfits perfectly misplaced, yet always showing up where the fun is.",
  },
  {
    name: "Ctrl+Alt+Elite",
    description:
      " A bold bunch that rewrites the rules, escapes the ordinary, and always hits refresh on life.",
  },
];

const GroupList = () => {
  return (
    <div className="container mt-3">
      {groups.map((group, index) => (
        <GroupItem key={index} group={group} />
      ))}
    </div>
  );
};

export default GroupList;
