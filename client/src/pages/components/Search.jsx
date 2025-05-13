import React, { useState } from "react";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import TippyWrapper from "@/components/Wrapper/TippyWrapper";
import AccountItemSearch from "@/components/AccountItem/AccountItemSearch";
import { searchUsers } from "@/apis/authService";
const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [result, setResult] = useState([]);
  const [showSearchResult, setShowSearchResult] = useState(true);
  const hide = () => {
    setShowSearchResult(false);
  };

  const handleSearch = async (keyword) => {
    try {
      const res = await searchUsers(keyword);
      console.log(res);
      setResult(res?.data?.userList || []);
    } catch (error) {
      console.log(error);
    }
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
              {result?.map((user) => (
                <AccountItemSearch key={user.userId} data={user} />
              ))}
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
          onChange={(e) => {
            const keyword = e.target.value;
            setSearchValue(keyword);
            if (keyword.trim() !== "") {
              setShowSearchResult(true);
              handleSearch(keyword);
            } else {
              setShowSearchResult(false);
              setResult([]);
            }
          }}
          onBlur={() => {
            setSearchValue("");
          }}
        />
      </Tippy>
    </div>
  );
};

export default Search;
