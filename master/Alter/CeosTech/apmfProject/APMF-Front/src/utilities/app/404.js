import { gsap } from "gsap";
import { Linear } from 'gsap/all';

const wheelAnimation = () => {

    let timeline1 = gsap.timeline();
    let timeline2 = gsap.timeline();

    timeline1.to(".cog1",
    {
        transformOrigin:"50% 50%",
        rotation:"+=360",
        repeat:-1,
        ease:Linear.easeNone,
        duration:8
    });

    timeline2.to(".cog2",
    {
        transformOrigin:"50% 50%",
        rotation:"-=360",
        repeat:-1,
        ease:Linear.easeNone,
        duration:8
    });
}

export default wheelAnimation;

