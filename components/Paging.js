import _ from "lodash";
import { Table, div, Icon } from "semantic-ui-react";

function Paging(props) {
  const { onBack, onNext, total, current, onClickPaging } = props || {};
  if (total == 0 || !total) return null;

  const backIndex = current - 1;
  const nextIndex = current + 1;
  const pagingList = _.fill(Array(total), 0);
  return (
    <div>
      <div>
        <div colSpan="5">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              as="a"
              className="pagingItem"
              style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "40px", height: "40px", borderRadius: "100px", border: "1px solid #af8787", marginLeft: "5px", marginRight: "5px", cursor:"pointer" }}
              onClick={() => onBack(backIndex)}
              disabled={current === 0}
            >
              <Icon name="chevron left" style={{ marginTop: "-4px", marginLeft: "2px" }} />
            </div>
            {_.map(pagingList, (item, index) => (
              <div
                className="pagingItem"
                style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "40px", height: "40px", borderRadius: "100px", border: "1px solid #af8787", marginLeft: "5px", marginRight: "5px",  cursor:"pointer"
              }}
                as="a"
                onClick={() => onClickPaging(index)}
                active={current === index}
              >
                {index}
              </div>
            ))}
            <div
              as="a"
              className="pagingItem"
              style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "40px", height: "40px", borderRadius: "100px", border: "1px solid #af8787", marginLeft: "5px", marginRight: "5px",  cursor:"pointer"  }}
              onClick={() => onNext(nextIndex)}
              disabled={current === total - 1}
            >
              <Icon name="chevron right" style={{ marginTop: "-4px", marginLeft: "2px" }}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Paging;
