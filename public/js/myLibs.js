/**
 * 用来返回随机好看颜色
 *
 */

const colors = ['#4169E1', '#6495ED', '#B0C4DE', '#778899', '#708090', '#1E90FF', '#F0F8FF',
    '#4682B4', '#87CEFA', '#87CEEB', '#00BFFF', '#ADD8E6', '#B0E0E6', '#5F9EA0', '#F0FFFF',
    '#E1FFFF', '#AFEEEE', '#00FFFF', '#00FFFF', '#00CED1', '#2F4F4F', '#008B8B', '#008080',
    '#48D1CC', '#20B2AA', '#40E0D0', '#7FFFAA', '#00FA9A', '#F5FFFA', '#00FF7F', '#3CB371',
    '#2E8B57', '#F0FFF0', '#90EE90', '#98FB98', '#8FBC8F', '#32CD32', '#00FF00', '#228B22',
    '#008000', '#006400', '#7FFF00', '#7CFC00', '#ADFF2F', '#556B2F', '#6B8E23', '#FAFAD2',
    '#FFFFF0', '#FFFFE0', '#FFFF00', '#808000', '#BDB76B', '#FFFACD', '#EEE8AA', '#F0E68C',
    '#FFD700', '#FFF8DC', '#DAA520', '#FFFAF0', '#FDF5E6', '#F5DEB3', '#FFE4B5', '#FFA500',
    '#FFEFD5', '#FFEBCD', '#FFDEAD', '#FAEBD7', '#D2B48C', '#DEB887', '#FFE4C4', '#FF8C00',
    '#FAF0E6', '#CD853F', '#FFDAB9', '#F4A460', '#D2691E', '#8B4513', '#FFF5EE', '#A0522D',
    '#FFA07A', '#FF7F50', '#FF4500', '#E9967A', '#FF6347', '#FFE4E1', '#FA8072', '#FFFAFA',
    '#F08080', '#BC8F8F', '#CD5C5C', '#FF0000', '#A52A2A', '#B22222', '#8B0000', '#800000',
    '#FFFFFF', '#F5F5F5', '#DCDCDC', '#D3D3D3', '#C0C0C0', '#A9A9A9', '#808080', '#696969', '#000000'];

function getRandomColor() {
    return colors[Math.round(Math.random() * colors.length)];
}