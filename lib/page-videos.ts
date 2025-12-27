// Video embeds for project pages
// Format: slug -> array of video embed objects

export type VideoEmbed = {
  type: "vimeo" | "youtube" | "self";
  id: string; // For vimeo/youtube: video ID. For self: path like "/videos/file.mp4"
  title?: string;
};

export const pageVideos: Record<string, VideoEmbed[]> = {
  "southern-birds-project": [
    {
      type: "vimeo",
      id: "1074273260?h=d54b13fd41",
      title: "Southern Birds",
    },
  ],
  "shabah-el-rih": [
    {
      type: "vimeo",
      id: "480393219",
      title: "Shabah El Rih",
    },
  ],
  "jal-el-bahr": [
    {
      type: "self",
      id: "/videos/jal-el-bahr.mp4",
      title: "Jal El Bahr",
    },
  ],
  "snakes-and-ladders": [
    {
      type: "self",
      id: "/videos/snakes-and-ladders.mp4",
      title: "Snakes & Ladders",
    },
  ],
  "unhearable-voices": [
    // Add Unhearable Voices video here when available
  ],
};
