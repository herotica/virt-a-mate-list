import { render } from "preact";
import { useState, useEffect } from "preact/hooks";
import preactLogo from "./assets/preact.svg";
import "./style.css";
import Data from "./data.json";

const FilterMissing = Data.filter(
  (item) => item.hubName && item.normalName && item.link
);

const pageOptions = {
  10: 10,
  20: 20,
  40: 40,
  100: 100,
  200: 200,
};

function Pager({ filteredItems }) {
  const [pageSize, setPageSize] = useState(pageOptions[20]);
  const [currentpage, setCurrentPage] = useState(0);

  const pages = Math.ceil(filteredItems.length / pageSize);

  function handlePageSelect(e) {
    setPageSize(e.target.value);
  }

  useEffect(() => {
    setCurrentPage(0);
  }, [filteredItems]);

  const PageElements = [];
  for (let index = 0; index < pages; index++) {
    PageElements.push(
      <buton
        className={`p-1.5 px-3 border-2  rounded-md bg-red-400 hover:bg-red-600 transition-colors cursor-pointer ${
          index === currentpage ? "border-red-200" : "border-red-700"
        }`}
        key={"page" + index}
        onClick={() => setCurrentPage(index)}
      >
        {index + 1}
      </buton>
    );
  }
  const pagedItems = filteredItems.slice(
    currentpage * pageSize,
    (currentpage + 1) * pageSize
  );

  return (
    <>
      <div className="flex items-center gap-3 flex-col md:flex-row mb-4">
        <div className="flex-1 flex flex-wrap gap-3 mx-4">{PageElements}</div>
        <select
          value={pageSize}
          onChange={handlePageSelect}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-lg"
        >
          {Object.keys(pageOptions).map((size, i) => (
            <option value={size}>{size}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 xl:gap-6 w-full">
        {pagedItems.map((item, i) => (
          <Item key={item.hubName + item.creator + i} item={item} />
        ))}
      </div>
    </>
  );
}

export function App() {
  const [query, setQuery] = useState("");

  const filteredItems =
    query.length > 0
      ? FilterMissing.filter((item) => {
          return `${item.hubName} ${item.creator} ${item.normalName} ${item.normalDescription}`
            .toLowerCase()
            .includes(query.toLowerCase());
        })
      : FilterMissing;

  return (
    <main className="h-full flex flex-col text-white bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-500 to-red-800">
      <div className="h-full overflow-y-auto p-5 lg:p-10">
        <div className="flex gap-3 pb-3 h-0">
        </div>
        <div className="lg:max-w-3xl xl:max-w-none mx-auto w-full">
          <h1 className="text-3xl underline text-center mb-4">
            Virt-a-Mate lookalikes
          </h1>
          <p className="mb-6 text-sm">
            list of looklikes on virt-a-mate hub, built from a google sheets{' '}
            <a
              className="text-yellow-300 font-bold"
              href="https://docs.google.com/spreadsheets/d/1BMj4TNgpsyskkN4AKTA1VypYFTy-RuE12mHzp3Q9f98/edit#gid=0"
            >
              Sheet
            </a>
            , source on{" "}
            <a
              className="text-yellow-300 font-bold"
              href="https://github.com/herotica/virt-a-mate-list"
            >
              github{" "}
            </a>
          </p>
          <div className="flex flex-col md:flex-row gap-3 mb-4 items-center">
            <h3>Search</h3>
            <input
              type="text"
              value={query}
              onInput={(e) => setQuery(e.target.value)}
              class="block w-60 rounded-md border-0 px-3 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="all text search"
            ></input>
            <div className="">
              # {filteredItems.length} / {FilterMissing.length}
            </div>
          </div>

          <Pager filteredItems={filteredItems} />
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
            className="text-yellow-300 font-bold"
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
