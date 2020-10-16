import _ from "lodash";
import { Table, div, Icon } from "semantic-ui-react";

function getPagingList(total, current) {
  switch (current) {
    case 0:
      return [0, total > 1 && 1, total > 2 && 2].filter(item => _.isNumber(item));
    case 1:
      return [0, 1, total > 2 && 2].filter(item => _.isNumber(item));
    case 2:
      return [1, 2, total > 3 && 3].filter(item => _.isNumber(item));
    case total - 1:
      return [current - 2, current - 1, current]
    default:
      return [current - 1, current, current + 1]
  }
}

function Paging(props) {
  const { onBack, onNext, total, current, onClickPaging } = props || {};
  if (total == 0 || !total) return null;

  const backIndex = current - 1;
  const nextIndex = current + 1;
  const pagingList = getPagingList(total, current);
  return (
    <div>
      <div>
        <div colSpan="5">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              as="a"
              className={current === 0 ? "" : "pagingItem"}
              style={{
                display: "flex", justifyContent: "center", alignItems: "center", width: "40px", height: "40px", borderRadius: "100px", border: "1px solid #af8787", marginLeft: "5px", marginRight: "5px",
                cursor: current === 0 ? "auto" : "pointer",
                opacity: current === 0 ? "0.5" : "1"
              }}
              onClick={current === 0 ? () => { } : () => onBack(backIndex)}
            >
              <Icon name="chevron left" style={{ marginTop: "-4px", marginLeft: "2px" }} />
            </div>
            {_.map(pagingList, (item) => (
              <div
                className="pagingItem"
                style={{
                  display: "flex", justifyContent: "center", alignItems: "center", width: "40px", height: "40px", borderRadius: "100px", border: "1px solid #af8787", marginLeft: "5px", marginRight: "5px", cursor: "pointer",
                  backgroundColor: current === item && "#bebf6e"
                }}
                onClick={() => onClickPaging(item)}
              >
                {item}
              </div>
            ))}
            <div
              as="a"
              className={current === total - 1 ? "" : "pagingItem"}
              style={{
                cursor: current === total - 1 ? "auto" : "pointer",
                opacity: current === total - 1 ? "0.5" : "1",
                display: "flex", justifyContent: "center", alignItems: "center", width: "40px", height: "40px", borderRadius: "100px", border: "1px solid #af8787", marginLeft: "5px", marginRight: "5px", cursor: "pointer"
              }}
              onClick={current === total - 1 ? () => { } : () => onNext(nextIndex)}
            >
              <Icon name="chevron right" style={{ marginTop: "-4px", marginLeft: "2px" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Paging;
