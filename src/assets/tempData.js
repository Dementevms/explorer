export default [
  {
    title: "Folder-1",
    type: "folder",
    open: true,
    hide: false,
    content: [
      {
        title: "Folder-1-1",
        type: "folder",
        open: true,
        hide: false,
        content: [
          {
            title: "File-1-1-1",
            type: "file",
            open: false,
            hide: false,
            content: "String content 1-1-1"
          }
        ]
      },
      {
        title: "Folder-1-2",
        type: "folder",
        open: true,
        hide: false,
        content: []
      },
      {
        title: "File-1-1",
        type: "file",
        open: false,
        hide: false,
        content: "String content"
      },
      {
        title: "File-1-2",
        type: "file",
        open: false,
        hide: false,
        content: "String content 2"
      }
    ]
  },
  {
    title: "File-1-1-1-2",
    type: "file",
    open: false,
    hide: false,
    content: "String content 2"
  }
];
