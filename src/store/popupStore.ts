import create from 'zustand'

type State = {
    list: [],
}

type Actions = {
    setList: (params: []) => void,
}

const initialState = {
  list: [
    {
        "type": "photo",
            "url": "https://pbs.twimg.com/media/GV-GP5VX0AAZDYn.jpg?name=4096x4096",
        "thumb": "https://pbs.twimg.com/media/GV-GP5VX0AAZDYn.jpg?name=4096x4096"
                
    },
    {
        "type": "video",
        "url": "https://video.twimg.com/ext_tw_video/1828327581252493312/pu/vid/avc1/720x960/csSqgfSn8GXRyHBo.mp4?tag=12",
        "thumb": "https://pbs.twimg.com/ext_tw_video_thumb/1828327581252493312/pu/img/FGI-Z5vncKv2YqFP.jpg"
    }
  ]
}

export const PopupStore = create<State & Actions>()((set) => ({
  ...initialState,
  setList: (res) => {
    console.log("%c Line:18 🥚 res", "color:#ffdd4d", res);
    set(() => ({ list:  res}))
  },
  reset: () => {
    set(initialState)
  },
}))