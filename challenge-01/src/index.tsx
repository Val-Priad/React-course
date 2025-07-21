import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

const skills = [
  {
    name: "HTML",
    emoji: "📝",
    bgColor: "#E34F26",
    color: "#FFFFFF",
  },
  {
    name: "CSS",
    emoji: "🎨",
    bgColor: "#1572B6",
    color: "#FFFFFF",
  },
  {
    name: "SCSS",
    emoji: "💅",
    bgColor: "#CF649A",
    color: "#FFFFFF",
  },
  {
    name: "JavaScript",
    emoji: "⚡",
    bgColor: "#F7DF1E",
    color: "#000000",
  },
  {
    name: "TypeScript",
    emoji: "🔷",
    bgColor: "#3178C6",
    color: "#FFFFFF",
  },
  {
    name: "Python",
    emoji: "🐍",
    bgColor: "#3776AB",
    color: "#FFFFFF",
  },
  {
    name: "Go",
    emoji: "🐹",
    bgColor: "#00ADD8",
    color: "#FFFFFF",
  },
  {
    name: "React",
    emoji: "⚛️",
    bgColor: "#61DAFB",
    color: "#000000",
  },
  {
    name: "Next.js",
    emoji: "▲",
    bgColor: "#000000",
    color: "#FFFFFF",
  },
  {
    name: "Django",
    emoji: "🎸",
    bgColor: "#092E20",
    color: "#FFFFFF",
  },
  {
    name: "Flask",
    emoji: "🌶️",
    bgColor: "#000000",
    color: "#FFFFFF",
  },
  {
    name: "Gin",
    emoji: "🍸",
    bgColor: "#00ACD7",
    color: "#FFFFFF",
  },
];

function App() {
  return (
    <main className="card">
      <img className="avatar" src="Me.svg" alt="Developer" />
      <div className="data">
        <h1>Valerii Priadchenko</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae omnis
          voluptas, ut perspiciatis repellendus rem? Eligendi quod, reiciendis
          a id ut velit in aut fugiat quos beatae et itaque hic.
        </p>
        <SkillList skills={skills} />
      </div>
    </main>
  );
}

function SkillList(props: any) {
  console.log(props.skills);
  return (
    <ul className="skill-list">
      {props.skills.map((skill: any) => (
        <li
          key={skill.name}
          className="skill"
          style={{
            color: skill.color,
            backgroundColor: skill.bgColor,
          }}
        >
          {skill.name} {skill.emoji}
        </li>
      ))}
    </ul>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
