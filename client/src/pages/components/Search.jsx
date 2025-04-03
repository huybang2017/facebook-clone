import React, { useEffect, useRef, useState } from "react";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import TippyWrapper from "@/components/Wrapper/TippyWrapper";
import AccountItem from "@/components/AccountItem/AccountItem";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [result, setResult] = useState([]);
  const [showSearchResult, setShowSearchResult] = useState(true);
  const hide = () => {
    setShowSearchResult(false);
  };
  return (
    <div className="relative">
      <Tippy
        interactive={true}
        visible={result.length > 0 && showSearchResult}
        offset={[0, -6]}
        render={(attrs) => (
          <div
            {...attrs}
            tabIndex={"-1"}
            className="w-[280px] max-h-[calc(100vh-80px)] rounded-lg bg-white shadow-sm"
          >
            <TippyWrapper>
              <AccountItem />
              <AccountItem />
              <AccountItem />
              <AccountItem />
            </TippyWrapper>
          </div>
        )}
        onClickOutside={hide}
      >
        <input
          className="w-[272px] h-auto ml-4 py-2 px-4 text-sm rounded-lg border"
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setResult([1, 2])}
        />
      </Tippy>
    </div>
  );
};

export default Search;
