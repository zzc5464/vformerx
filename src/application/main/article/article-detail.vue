<template>
    <main>
        <header>
            <div class="top">
                <h3>自助服务新体验，横琴人寿在线有新功能上线拉！！【运营服务】</h3>
                <p>
                    <span>医疗 | 2018-06-08 12:23</span>
                    <span><i></i>文章预览</span>
                </p>
            </div>
            <div class="bottom">
                <div class="recommend-l">
                    <p>产品推荐</p>
                    <p>
                        <span>健康险</span>
                        <span>横琴人寿xxx重大疾病保险</span>
                    </p>
                </div>
                <div class="recommend-r">
                    >
                </div>
             
            </div>
        </header>
        <section class="article-info">
            <div class="article-title">
                <p class="left">
                    <span>
                        阅读（10000）
                    </span>
                    <span>
                        分享（100）
                    </span>
                </p>
                <p>
                    <span>按最近阅读</span>
                    <i></i>
                </p>
            </div>
            <ul class="article-content">
                <li class="a-items" v-for='(v,i) in list' :key='i'>
                    <div class="left">
                        <p>
                        </p>
                        <p>
                            <span>王小妹</span>
                            <span>2016-06-29 12:28</span>
                        </p>
                    </div>
                    <div class="right">
                        <p>
                            <span>10秒</span>
                            <span>阅读</span>
                        </p>
                        <p>
                            <span>0次</span>
                            <span>分享</span>
                        </p>
                    </div>
                </li>
            </ul>
        </section>
        <footer>
            <p class="line"></p>
            <p class="footer_text">我就是底线</p>
        </footer>
    </main>
</template>
<script>
export default {
  data () {
    return {
      obj: {
        title: 'xxx'
      },
      list: [
        {
          id: 1
        },
        {
          id: 2
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../assets/styles/variable";
@import "../../../assets/styles/fn";

main {
  background-color: @bg-gary;
  height: 100%;
}
header {
  padding: 5% 3% 0;
  background-color: #fff;
  .top {
    .bd();
    h3 {
      font-size: 16px;
      font-weight: bold;
      letter-spacing: 2px;
    }
    & > p {
      display: flex;
      justify-content: space-between;
      padding-bottom: 10px;
      span {
        font-size: 14px;
        &:first-child {
          color: #ccc;
        }
        &:last-child {
          color: deepskyblue;
        }
      }
    }
  }
  .bottom {
    padding: 5% 0;
    position: relative;
    .recommend-l {
        display: flex;
        flex-flow: row nowrap;
        p {
            &:first-child {
                width: 2rem;
                line-height: 1rem;
                font-size: 1rem;
                color: deepskyblue;
                font-weight: 600;
                padding-right: 2%;
                border-right: 1px solid #ddd;
            }
            &:nth-of-type(2) {
                padding-left: 3%;
                span {
                    display: inline-block;
                    &:first-child {
                        background-color: deepskyblue;
                        padding: 2px 4px;
                        color: #fff;
                        border-radius: 5px;
                        margin-right: 5px;
                       
                    }
                }
            }
            
        }
    }
    .recommend-r {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
    }

  }
}
.article-info {
    margin-top: 14px;
    background-color: #fff;
    .article-title {
        padding: 3%;
        display: flex;
        justify-content: space-between;
        .bd();
        .left {
            color: #000;
        }
        P{
            &:last-child {
                span {
                    color: #888;
                    padding-right: 10px;
                }
                i {
                 .triangle(5px);
                 position: relative;
                 top: 2px;
                }
            }
            
        }
    }
}
.article-content {
    padding: 0 4%;
    .a-items {
        .bd();
        display: flex;
        justify-content: space-between;
        padding-top: 4%;
        &:last-child {
            border-bottom: none;
        }
        .left {
            display: flex;
            padding-bottom: 3%;
            p {
                &:first-child {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    overflow: hidden;
                    background: url(../../../assets/imgs/pig.png) no-repeat center/cover;
                    margin-right: 10px;
                }
                &:nth-of-type(2) {
                    span {
                        display: block;
                        &:first-child {
                            font-size: 16px;
                            color: #333;
                            font-weight: 600;
                        }
                        &:last-child {
                            font-size: 14px;
                            color: #ccc;
                        }
                    }
                }
            }
        }
        .right {
            display: flex;
            p {
                padding-left: 20px;
            }
            span {
                display: block;
                &:last-child {
                    color: #888;
                }
            }
        }
    }
}
footer {
    position: relative;
    text-align: center;
    height: 40px;
    .line {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%);
        width: 70%;
        height: 1px;
        background-color: #ddd;
        display: inline-block;
    }
    .footer_text {
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translate(-50%);
        font-size: 12px;
        padding: 0 20px;
        color: #bbb;
        background-color: #eee;
        z-index: 99;
    }
}
</style>

