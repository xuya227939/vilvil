import React, { useEffect, useState, type HTMLAttributeAnchorTarget } from "react";
import "nes.css/css/nes.min.css";
import { popupService } from '~service';
import { PopupStore } from '~store/popupStore';
import BilibiliImage from "raw:~assets/bilibili.png";
import FacebookImage from "raw:~assets/facebook.png";
import InstagramImage from "raw:~assets/instagram.png";
import YoutubeImage from "raw:~assets/youtube.png";
import XImage from "raw:~assets/x.png";
import "~style.css";
import { isEmpty, isValidUrl } from "~utils";


function IndexPopup() {
  const { setList, list } = PopupStore();
  const { getVideos } = popupService;
  const [val, setVal] = useState();

  useEffect(() => {
    // document.getElementById('dialog-picker').showModal();
  }, [])

  const handleClick = () => {
    if (!val) {
        return;
    }

    if (!isValidUrl(val)) {
        return;
    }

    getVideos(val).then((res) => {
        if (res.status === 'picker') {
            setList(res.picker);
            // @ts-ignore
            document.getElementById('dialog-picker').showModal();
        }

        if (res.status === 'redirect') {
            window.open(res.url, '_blank');
        }

      }).catch((err) => {
        // @ts-ignore
        document.getElementById('dialog-message').showModal();
      })
  }

  return (
    <div>
        <div style={{ width: '400px', height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            <div style={{ background: '#1463b0', width: '100%', height: '100px', position: 'absolute', top: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ fontWeight: 500, fontSize: 24, marginBottom: '24px', color: '#fff' }}>VilVil</div>
            </div>
            <div style={{ display: 'flex' }}>
                <input type="text" className="nes-input" style={{ width: '300px', height: '30px', marginRight: '10px' }} placeholder="Input Url" onChange={(e: any) => setVal(e.target.value)} />
                <button type="button" className="nes-btn is-primary" style={{ width: '50px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={handleClick}>Go！</button>
            </div>
            <div style={{
                background: 'rgb(167 191 214)',
                width: '100%',
                height: '50px',
                position: 'absolute',
                bottom: 0,
                display: 'flex', justifyContent: 'center', alignItems: 'center'
            }}>
                Support: 
                <img style={{ width: 24, height: 24 }} src={BilibiliImage} />
                <img style={{ width: 24, height: 24 }} src={FacebookImage} />
                <img style={{ width: 24, height: 24 }} src={InstagramImage} />
                <img style={{ width: 24, height: 24 }} src={YoutubeImage} />
                <img style={{ width: 24, height: 24 }} src={XImage} />
            </div>
        </div>
        <section>
            <dialog className="nes-dialog" id="dialog-message">
                <form method="dialog">
                <p className="title">i don't see anything i could download by your link. try a different one!</p>
                <menu className="dialog-menu">
                    <button className="nes-btn">Cancel</button>
                </menu>
                </form>
            </dialog>
        </section>

        <section>
            <dialog className="nes-dialog" id="dialog-picker" style={{ width: '300px' }}>
                <form method="dialog">
                <div style={{
                    display: 'flex',
                    justifyContent: 'start',
                    flexWrap: 'wrap',
                    alignContent: 'space-around',
                }}>
                    {
                        !isEmpty(list) && list.map((item: any, index) => {
                            return (
                                <a key={index} style={{ marginLeft: '2px', marginRight: '2px', cursor: 'pointer' }} href={item.url} target="_blank">
                                    <div>{item.type}</div>
                                    <img style={{ width: 100, height: 100 }} src={item.thumb} />
                                </a>

                            )
                        })
                    }
                </div>
                <menu className="dialog-menu">
                    <button className="nes-btn">Cancel</button>
                </menu>
                </form>
            </dialog>
        </section>
    </div>
  )
}

export default IndexPopup
