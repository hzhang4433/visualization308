var container = document.getElementById('activity');
var chart = echarts.init(container);

var baseUrl = 'https://oss.x-lab.info/open_digger/github/';
var repoName = getUrlParam('repo', 'X-lab2017/open-digger');
var type = getUrlParam('type', 'openrank');

$.getJSON(
  `${baseUrl}${repoName}/${type}.json`,
  data => {
    var accValue = [];
    Object.keys(data).filter(k => k.length === 7).map(k => data[k]).reduce((p, c) => {
      accValue.push(p);
      return p + c;
    });
    chart.setOption({
      title: { text: `2020-2023 ${type} for ${repoName}`,
               left: 'center' ,
               textStyle: {
                color:'#ccc'
                 }
            },
      xAxis: {
        type: 'category',
        data: Object.keys(data).filter(k => k.length === 7),
      },
      yAxis: [{ type: 'value' }, { type: 'value' }],
      series: [{
        type: 'bar',
        data: Object.keys(data).filter(k => k.length === 7).map(k => data[k]),
      }, {
        type: 'line',
        yAxisIndex: 1,
        data: accValue,
        smooth: true,
      }],
    })
  }
);