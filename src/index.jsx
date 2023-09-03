import { render } from "preact";
import { useState } from "preact/hooks";
import preactLogo from "./assets/preact.svg";
import "./style.css";
import Data from "./data.json";

const FilterMissing = Data.filter(item => (item.hubName && item.normalName && item.link));

export function App() {
  const [query, setQuery] = useState("");

  const filteredItems =
    query.length > 0
      ? FilterMissing.filter((item) => {
          return `${item.hubName} ${item.creator} ${item.normalName} ${item.normalDescription}`
            .toLowerCase()
            .includes(query);
        })
      : FilterMissing;

  return (
    <main className="h-full flex flex-col text-white bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-500 to-red-800">
      <div className="h-full overflow-y-auto p-5 lg:p-10">
        <div className="lg:max-w-3xl xl:max-w-none mx-auto w-full">
          <h1 className="text-3xl underline text-center mb-4">
            Virt-a-Mate lookalikes
          </h1>
          <p className="mb-6 text-sm">
            list of looklikes on virt-a-mate hub, built from a google sheets
            (please request access if want to help, just no renaming/moving
            columns!){" "}
            <a className="text-blue-700 font-bold" href="https://docs.google.com/spreadsheets/d/1BMj4TNgpsyskkN4AKTA1VypYFTy-RuE12mHzp3Q9f98/edit#gid=0">
              Sheet
            </a>
            , also code available on{" "}
            <a className="text-blue-700 font-bold" href="https://github.com/herotica/virt-a-mate-list">github </a>
          </p>
          <div className="flex flex-col md:flex-row gap-3 mb-8 items-center">
            <h3>Search</h3>
            <input
              type="text"
              value={query}
              onInput={(e) => setQuery(e.target.value)}
              class="block w-60 rounded-md border-0 px-3 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="all text search"
            ></input>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 xl:gap-6 w-full">
            {filteredItems.map((item) => (
              <Item key={item.hubName + item.creator} item={item} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function Item({ item }) {
  const paid = item?.paid && item.paid.toLowerCase().trim() === "y";
  return (
    <div className="h-40 flex border border-black bg-white text-slate-800 rounded overflow-hidden">
      <div className="block w-1/3">
        <img
          src={item.miniImage}
          className="w-full h-full block object-top object-cover"
        />
      </div>
      <div className="lg:w-2/3 p-2 lg:p-3 text-sm">
        <h4 className="font-bold">{item?.normalName || "missing"}</h4>
        <h5 className="">Hub Name: {item?.hubName || "missing"}</h5>
        <p>creator: {item?.creator || "missing"}</p>
        <div className="flex flex-row gap-4">
          <a
            href={item.link}
            target="_blank"
            className="text-blue-700 font-bold"
          >
            LINK
          </a>
          <b
            className={`font-bold ${paid ? "text-red-500" : "text-green-400"}`}
          >
            {paid ? "$" : "free"}
          </b>
        </div>
        <p className="text-xs">
          Face {item?.faceReview || 0}/5 , Body {item?.bodyReview || 0}/5
        </p>
        {item.normalDescription && (
          <p className="text-xs text-slate-500">
            description: {item.normalDescription}
          </p>
        )}
      </div>
    </div>
  );
}

render(<App />, document.getElementById("app"));
