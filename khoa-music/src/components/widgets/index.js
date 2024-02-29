import React, { useState, useEffect } from "react";
import "./widgets.css";
import apiClient from "../../spotify";
import WidgetCard from "./widgetCard";

export default function Widgets({ artistID }) {
  const [similar, setSimilar] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [newRelease, setNewRelease] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!artistID) return;

      try {
        const [similarArtistsRes, featuredPlaylistsRes, newReleasesRes] = await Promise.all([
          apiClient.get(`/artists/${artistID}/related-artists`),
          apiClient.get(`/browse/featured-playlists`),
          apiClient.get(`/browse/new-releases`),
        ]);

        setSimilar(similarArtistsRes.data?.artists.slice(0, 3) || []);
        setFeatured(featuredPlaylistsRes.data?.playlists.items.slice(0, 3) || []);
        setNewRelease(newReleasesRes.data?.albums.items.slice(0, 3) || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [artistID]);

  return (
    <div className="widgets-body flex">
      <WidgetCard title="Similar Artists" similar={similar} />
      <WidgetCard title="Made For You" featured={featured} />
      <WidgetCard title="New Releases" newRelease={newRelease} />
    </div>
  );
}