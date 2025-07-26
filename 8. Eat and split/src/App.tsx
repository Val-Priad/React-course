import { validateHeaderValue } from "http";
import "./index.css";
import React, { ChangeEvent, useState } from "react";

type FriendT = {
  id: string;
  name: string;
  image: string;
  balance: number;
};

const initialFriends = [
  {
    id: "118836",
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: "933372",
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: "499476",
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  let [friends, setFriends] = useState(initialFriends);
  let [showAddFriend, setShowAddFriend] = useState(false);
  let [selectedFriend, setSelectedFriend] = useState<null | FriendT>(null);

  function handleAddNewFriend(name: string, image: string) {
    if (!name || !image) return;
    setFriends((old) => [
      ...old,
      { id: crypto.randomUUID(), name, image, balance: 0 },
    ]);
    setShowAddFriend(false);
  }

  function handleSplitBill(value: number) {
    setFriends((old) =>
      old.map((friend) =>
        friend.id === selectedFriend?.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          selectedFriend={selectedFriend}
          onFriendSelect={setSelectedFriend}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddNewFriend} />}
        <button
          className="button"
          onClick={() => setShowAddFriend((show) => !show)}
        >
          {showAddFriend ? <>Close</> : <>Add friend</>}
        </button>
      </div>
      {selectedFriend !== null && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

function FriendList({
  friends,
  selectedFriend,
  onFriendSelect,
}: {
  friends: FriendT[];
  selectedFriend: FriendT | null;
  onFriendSelect: (friend: FriendT | null) => void;
}) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          selectedFriend={selectedFriend}
          onFriendSelect={onFriendSelect}
        />
      ))}
    </ul>
  );
}

function Friend({
  friend,
  selectedFriend,
  onFriendSelect,
}: {
  friend: FriendT;
  selectedFriend: FriendT | null;
  onFriendSelect: (friend: FriendT | null) => void;
}) {
  const isSelected = friend.id === selectedFriend?.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}€
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}€
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <button
        className="button"
        onClick={() => onFriendSelect(isSelected ? null : friend)}
      >
        {isSelected ? <>Close</> : <>Select</>}
      </button>
    </li>
  );
}

function FormAddFriend({
  onAddFriend,
}: {
  onAddFriend: (name: string, image: string) => void;
}) {
  let [name, setName] = useState("");
  let [url, setUrl] = useState("");
  return (
    <form
      className="form-add-friend"
      onSubmit={(e) => {
        e.preventDefault();
        onAddFriend(name, url);
      }}
    >
      <label htmlFor="name">🧑 Friend name</label>
      <input
        name="name"
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="url">🌅 Image URL</label>
      <input
        name="url"
        id="url"
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button className="button">Add</button>
    </form>
  );
}

function FormSplitBill({
  selectedFriend,
  onSplitBill,
}: {
  selectedFriend: FriendT;
  onSplitBill: (value: number) => void;
}) {
  const [bill, setBill] = useState<number | string>("");
  const [userExpenses, setUserExpenses] = useState<number | string>("");
  const [userIsPaying, setUserIsPaying] = useState(true);
  const friendsExpenses =
    Number.isFinite(+bill) &&
    Number.isFinite(+userExpenses) &&
    +bill > 0 &&
    +userExpenses >= 0 &&
    +userExpenses <= +bill
      ? +bill - +userExpenses
      : "";

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (+userExpenses + +friendsExpenses !== +bill) {
      alert(`Invalid input`);
      return;
    }
    onSplitBill(userIsPaying ? +friendsExpenses : -userExpenses);
  }

  return (
    <form
      className="form-split-bill"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
    >
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label htmlFor="value">💰 Bill value</label>
      <input
        type="text"
        id="value"
        name="value"
        value={bill}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setBill(e.target.value);
        }}
      />

      <label htmlFor="expense">🧍 Your expense</label>
      <input
        type="text"
        id="expense"
        name="expense"
        value={userExpenses}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setUserExpenses(e.target.value);
        }}
      />

      <label htmlFor="friends-expense">
        🧑‍🤝‍🧑 {selectedFriend.name}'s expense
      </label>
      <input
        disabled
        type="text"
        id="friends-expense"
        name="friends-expense"
        value={friendsExpenses}
      />

      <label htmlFor="who-pays">🤑 I have paid for the meal</label>
      <input
        type="checkbox"
        name="who-pays"
        id="who-pays"
        checked={userIsPaying}
        onChange={() => setUserIsPaying((previous) => !previous)}
      ></input>
      <button className="button">Split bill</button>
    </form>
  );
}
