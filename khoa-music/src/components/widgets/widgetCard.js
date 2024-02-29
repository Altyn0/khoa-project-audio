import React from "react";
import "./widgetCard.css";
import WidgetEntry from "./widgetEntry";
import { IconContext } from "react-icons";
import { FiChevronRight } from "react-icons/fi";

export default function WidgetCard({ title, similar, featured, newRelease }) {
  const renderWidgetEntries = (items, type) => {
    return items.map((item) => {
      let subtitle = '';
      let image = '';

      switch (type) {
        case 'similar':
          subtitle = `${item?.followers?.total} Followers`;
          image = item?.images[2]?.url;
          break;
        case 'featured':
          subtitle = `${item?.tracks?.total} Songs`;
          image = item?.images[0]?.url;
          break;
        case 'newRelease':
          subtitle = item?.artists[0]?.name;
          image = item?.images[2]?.url;
          break;
        default:
          break;
      }

      return (
        <WidgetEntry
          key={item.id} // Assuming each item has a unique id
          title={item?.name}
          subtitle={subtitle}
          image={image}
        />
      );
    });
  };

  return (
    <div className="widgetcard-body">
      <p className="widget-title">{title}</p>
      {similar && renderWidgetEntries(similar, 'similar')}
      {featured && renderWidgetEntries(featured, 'featured')}
      {newRelease && renderWidgetEntries(newRelease, 'newRelease')}
      <div className="widget-fade">
        <div className="fade-button">
          <IconContext.Provider value={{ size: "24px", color: "#c4d0e3" }}>
            <FiChevronRight />
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
}