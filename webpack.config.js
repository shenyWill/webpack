var htmlWebpackPlugin = require('html-webpack-plugin');//打包html页面的插件
var ExtractTextPlugin = require('extract-text-webpack-plugin');//打包出css或者scss形成单独的目录
var path = require('path');//nodejs自带的path路径
var CleanWebpackPlugoin = require('clean-webpack-plugin');//清除目录插件

module.exports = {
	
	entry: {
		helloWorld: __dirname + '/skin/js/helloWorld.js',
		one: __dirname + '/skin/js/one.js',
		two: __dirname + '/skin/js/two.js',
		three: __dirname + '/skin/js/three.js',
	},
	
	output: {
		path: __dirname + '/app/html',
		filename: '../../dist/js/[name]-[chunkhash].js',
//		publicPath: 'www.cdn.com/' //会把地址前缀替换成改地址
	},
	
	module:{
//		loaders:[
//			{
//				test: /\.js$/,
//				loader: 'babel-loader',
//				exclude: path.resolve(__dirname + '/node_modules/'),//nodejs里的解析方法，这样可以得到node_modules的路径
//				query: {
//					presets: ['latest']
//				}
//			},
//			{
//				test: /\.css$/,
////				loader: 'style-loader!css-loader!postcss-loader',//其中一种写法
//				loaders: ["style-loader","css-loader"]//另一种写法
//			},
//			{
//				test: /\.(png|jpg|svg)$/,
//				loader: 'file-loader', //图片的loader
//				query: {
//					name: '../../dist/image/[name]-[hash:6].[ext]' //给生成的img重命名
//				}
//			}
//		]
		rules:[
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true //css压缩
                            }
                        }
                    ]
                })
			},
			{
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
//                  use: ['css-loader','sass-loader'] //scss换换需要安装node-sass sass-loader两个插件
					use: [{
						loader: 'css-loader',
						options: {
                            minimize: true //css压缩
                   		}	
					},{
						loader: 'sass-loader'
					}]
                })
            },
			{
				test: /\.js$/,
				use: [{
					loader: 'babel-loader',
					options: {
						presets: ['latest']
					}
				}],
				exclude: path.resolve(__dirname + '/node_modules/')
			},
			{
				test: /\.(png|jpg|svg)$/,
				use: ['file-loader?limit=2000&name=../../dist/image/[name]-[hash:6].[ext]']
			}
		]
	},
	
	plugins: [
		new htmlWebpackPlugin({
			template: __dirname + '/app/tmpl/index.html',
			inject: false,//自动引入的js放在哪个位置， true | 'head' | 'body' | false
			filename: 'index-[chunkhash].html',
			title: 'webpack is good',
			data: new Date(),
			minify: {
				removeComments: true,//删除注释
				collapseWhitespace: true//删除空格
			}
		}),
		new htmlWebpackPlugin({
			template: __dirname + '/app/tmpl/indexTwo.html',
			inject: true,//自动引入的js放在哪个位置， true | 'head' | 'body' | false
			filename: 'one.html',
			chunks: ['one','helloWorld']
		}),
		new htmlWebpackPlugin({
			template: __dirname + '/app/tmpl/indexTwo.html',
			inject: true,//自动引入的js放在哪个位置， true | 'head' | 'body' | false
			filename: 'two.html',
			chunks: ['two']
		}),
		new htmlWebpackPlugin({
			template: __dirname + '/app/tmpl/indexTwo.html',
			inject: true,//自动引入的js放在哪个位置， true | 'head' | 'body' | false
			filename: 'three.html',
			excludeChunks: ['one','helloWorld','two']//忽略不加入的chunks
		}),
		new ExtractTextPlugin({
			filename: '../../dist/css/[name]-[contenthash:8].css',
			allChunks: true,
		}),
		new CleanWebpackPlugoin(
			['dist','app/html/*.html'], //指定打包前需要清空删除的文件
			{
				root: __dirname,    　　　　　　　　　
                verbose: true,      　　　　　　　　
                dry: false 
			}
		)
	],
	

	
	
//	postcss: [
//		require('autoprefixer')({
//			broswers: ['last 5 versions']
//		})
//	]
	
}
