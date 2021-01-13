Page({
    data: {
        text: "",
        patentType: -1,
        journalQuality: -1,
        projectType: -1,
        patentUnitType: -1,
        paperUnitType: -1,
        projectUnitType: -1,
        patentFilter: [{
            key: -1,
            value: "所有专利"
        },
        {
            key: 1,
            value: "发明专利"
        },
        {
            key: 2,
            value: "实用新型"
        },
        {
            key: 3,
            value: "外观设计"
        }
        ],
        paperFilter: [{
            key: -1,
            value: "所有论文"
        },
        {
            key: 23,
            value: "一级期刊/EI"
        },
        {
            key: 4,
            value: "核心期刊"
        }
        ],
        projectFilter: [{
            key: -1,
            value: "所有项目"
        },
        {
            key: 2,
            value: "国家科技项目"
        },
        {
            key: 1,
            value: "国家自然科学基金"
        },
        {
            key: 3,
            value: "省部级项目"
        },
        {
            key: 4,
            value: "横向项目"
        },
        {
            key: 5,
            value: "纵向项目"
        }
        ],
        unitFilter: [{
            key: "-1",
            value: "所有单位"
        },
        {
            key: "01",
            value: "大专院校"
        },
        {
            key: "02",
            value: "科研院所"
        },
        {
            key: "03",
            value: "企业"
        }
        ],

        patents: [],
        papers: [],
        projects: [],
        tabCur: 0
    },
    goToPage(e) {
        dd.navigateTo({
            url: e.target.dataset.url
        })
    },
    tabSelect(e) {
        this.setData({
            tabCur: e.target.dataset.id
        })
    },
    search() {
        this.getPapers();
        this.getPatents();
        this.getProjects();
    },
    getPatents() {
        let _this = this
        dd.httpRequest({
            url: 'https://www.itech4u.cn/api/h5/recommendSearch',
            data: JSON.stringify({
                keyword: this.data.text,
                literatureType: this.data.patentType,
                type: "patent",
                unitType: this.data.patentUnitType
            }),
            method: 'POST',
            headers: {
                'content-type': 'application/json; charset=UTF-8'
            },
            success: function (res) {
                console.log(res);
                res.data.data.list.map(item => item.patentType = _this.getType(item.patentType))
                _this.setData({
                    patents: res.data.data.list
                })
            }
        });
    },
    getProjects() {
        let _this = this
        dd.httpRequest({
            url: 'https://www.itech4u.cn/api/h5/recommendSearch',
            data: JSON.stringify({
                keyword: this.data.text,
                literatureType: this.data.projectType,
                type: "project",
                unitType: this.data.projectUnitType
            }),
            method: 'POST',
            headers: {
                'content-type': 'application/json; charset=UTF-8'
            },
            success: function (res) {
                console.log(res);
                _this.setData({
                    projects: res.data.data.list
                })
            }
        });
    },
    getPapers() {
        let _this = this
        dd.httpRequest({
            url: 'https://www.itech4u.cn/api/h5/recommendSearch',
            data: JSON.stringify({
                keyword: this.data.text,
                literatureType: this.data.journalQuality,
                type: "paper",
                unitType: this.data.paperUnitType
            }),
            method: 'POST',
            headers: {
                'content-type': 'application/json; charset=UTF-8'
            },
            success: function (res) {
                console.log(res);
                _this.setData({
                    papers: res.data.data.list
                })
            }
        });
    },
    inputFocus() {
        dd.navigateBack({
            delta: 1
        })
    },
    getType(type) {
        switch (type) {
            case 1:
                return "发明专利"
                break;
            case 2:
                return "实用新型"
                break;
            case 3:
                return "外观设计"
                break;
            case 8:
                return "中国国家阶段的PCT发明专利申请"
                break;
            case 9:
                return "中国国家阶段的PCT实用新型专利申请"
                break;
            default:
                return "其他"
                break;
        }
    },
    onLoad(query) {
        // 页面加载
        console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
        this.setData({
            text: query.text
        })
        this.search()
    },
    onReady() {
        // 页面加载完成
    },
    onShow() {
        // 页面显示
    },
    onHide() {
        // 页面隐藏
    },
    onUnload() {
        // 页面被关闭
    },
    onTitleClick() {
        // 标题被点击
    },
    onPullDownRefresh() {
        // 页面被下拉
    },
    onReachBottom() {
        // 页面被拉到底部
    },
    onShareAppMessage() {
        // 返回自定义分享信息
        return {
            title: 'My App',
            desc: 'My App description',
            path: 'pages/index/index',
        };
    },
});
