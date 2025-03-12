// 故事内容数据结构
const storyData = {
    start: {
        text: "你站在魔法森林的入口，面前有两条小径。一条通向闪烁着微光的山洞，另一条通向郁郁葱葱的深林。",
        options: [
            { text: "探索发光的山洞", nextId: "cave" },
            { text: "进入神秘的深林", nextId: "forest" }
        ]
    },
    cave: {
        text: "在山洞里，你发现了一个古老的魔法水晶。它似乎在召唤着你...",
        options: [
            { text: "触摸水晶", nextId: "crystal_touch" },
            { text: "离开山洞", nextId: "leave_cave" }
        ]
    },
    crystal_touch: {
        text: "当你触摸水晶的瞬间，一道温暖的光芒包围了你。你获得了理解动物语言的能力！",
        options: [
            { text: "继续探索", nextId: "forest_with_power" },
            { text: "返回森林入口", nextId: "start" }
        ]
    },
    leave_cave: {
        text: "你决定不冒险碰触神秘的水晶，离开了山洞。也许这是明智的选择...",
        options: [
            { text: "前往森林", nextId: "forest" },
            { text: "返回森林入口", nextId: "start" }
        ]
    },
    forest: {
        text: "在森林中，你遇到了一只受伤的小鹿。它看起来需要帮助。",
        options: [
            { text: "尝试帮助小鹿", nextId: "help_deer" },
            { text: "继续前进", nextId: "ignore_deer" }
        ]
    },
    forest_with_power: {
        text: "有了理解动物语言的能力，你听到小鹿在说：请帮帮我，我知道一个关于这片森林的重要秘密。",
        options: [
            { text: "帮助小鹿并听它讲述秘密", nextId: "deer_secret" },
            { text: "婉拒并继续探索", nextId: "ignore_deer" }
        ]
    },
    help_deer: {
        text: "你小心地接近小鹿，为它包扎了伤口。小鹿感激地看着你，然后蹦跳着消失在森林中。",
        options: [
            { text: "继续探索森林", nextId: "forest_end" },
            { text: "返回森林入口", nextId: "start" }
        ]
    },
    deer_secret: {
        text: "小鹿告诉你森林中隐藏着一个古老的精灵圣地，那里蕴含着强大的魔法力量。你成功找到了圣地，获得了守护森林的资格！",
        options: [
            { text: "接受守护者的身份", nextId: "guardian_end" },
            { text: "谢绝这个职责", nextId: "forest_end" }
        ]
    },
    ignore_deer: {
        text: "你选择继续前进。随着深入，你发现森林越来越暗，最终不得不返回。",
        options: [
            { text: "重新开始", nextId: "start" }
        ]
    },
    forest_end: {
        text: "经过这次冒险，你对魔法森林有了更深的理解。虽然没有获得特殊的力量，但这次经历让你难忘。",
        options: [
            { text: "重新开始", nextId: "start" }
        ]
    },
    guardian_end: {
        text: "恭喜你！你成为了魔法森林的守护者。从此以后，你将与森林中的生物和谐共处，守护这片神奇的土地。",
        options: [
            { text: "重新开始新的冒险", nextId: "start" }
        ]
    }
};