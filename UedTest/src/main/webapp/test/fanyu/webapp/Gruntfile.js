module.exports = function(grunt) {
    var packageJson = grunt.file.readJSON('package.json'),
        path = {
            css:'css/',
            lib:'lib/',
            js:'common/'
        },
        dest = 'dest/',
        //banner = '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd hh:mm:ss") %> */\n',
        banner = '/*!\n * ecp\n * version: ' + packageJson.name + '\n * build: <%= new Date() %>\n */\n\n';
    // 构建任务配置
    grunt.initConfig({
        //读取package.json的内容，形成个json数据
        pkg: packageJson,
        jshint: {
            ecp: {
                lint: {
                    files: [
                        path.js+'common.js',
                        path.js+'config.js'
                    ]
                },
                watch: {
                   files: '<config:lint.files>',
                   tasks: 'default'
                },
                src: [
                    path.js+'common.js',
                    path.js+'config.js'
                ],
                globals: {
                    exports: true
                }
            }
        },
        copy:{
            ecp:{
                files:[
                    {
                        expand:true,
                        cwd:'lib/dialog/6.0.4/',
                        src:['**/*','!**/*.svn','!**/*.js','!**/*.css'],
                        dest: dest
                    },
                    {
                        expand:true,
                        cwd:'lib/datepicker/4.8.b2/',
                        src:['**/*','!**/*.svn','!*.js','!*.css'],
                        dest: dest
                    },
                    {
                        expand:true,
                        cwd:'lib/jqueryui/',
                        src:['**/*','!**/*.svn','!**/*.js','!**/*.css'],
                        dest: dest
                    },
                    {
                        expand:true,
                        cwd: path.css +'images/',
                        src:['**/*','!**/*.svn'],
                        dest: dest+'/images'
                    }
                ]
            }
        },
        concat:{
            //文件头部输出信息
            options: {
                banner: banner
            },
            ecp:{
                files:[
                    {
                        'dest/lib.js': [
                            path.lib+'jquery/1.8.1/jquery.js',
                            path.lib+'validate/1.13.1/jquery.validate.min.js',
                            path.lib+'json2/1.0.0/json2.js',
                            path.lib+'blockUI/2.64/jquery.blockUI.js',
                            path.lib+'handlebars/1.3.0/handlebars.js',
                            path.lib+'handlebars/1.3.0/helpers.js',
                            path.lib+'pagination/1.2.1/jquery.pagination.js',
                            path.js+'frameInit.js',
                            path.lib+'jqueryui/jquery-ui.min.js',
                            path.lib+'dialog/6.0.4/dialog-plus.js'
                        ]
                    },
                ]
            }
        },
        cssmin: {
            //文件头部输出信息
            options: {
                banner: banner
            },
            ecp: {
                files: {
                    'dest/<%= pkg.name %>.min.css': [
                        path.css+'common.css',
                        path.css+'tablepay.css',
                        path.lib+'jqueryui/jquery-ui.min.css',
                        path.lib+'dialog/6.0.4/css/ui-dialog.css'
                    ]
                }
            }
        },
        uglify: {
            //文件头部输出信息
            options: {
                banner: banner
            },
            //具体任务配置
            ecp: {
                files: [
                    {
                        'dest/lib.min.js': [
                            path.lib+'jquery/1.8.1/jquery.js',
                            path.lib+'validate/1.13.1/jquery.validate.min.js',
                            path.lib+'json2/1.0.0/json2.js',
                            path.lib+'blockUI/2.64/jquery.blockUI.js',
                            path.lib+'handlebars/1.3.0/handlebars.js',
                            path.lib+'handlebars/1.3.0/helpers.js',
                            path.lib+'pagination/1.2.1/jquery.pagination.js',
                            path.js+'frameInit.js',
                            path.lib+'jqueryui/jquery-ui.min.js',
                            // path.lib+'qtip/jquery.qtip.js',
                            // path.lib+'datepicker/4.8.b2/WdatePicker.js',
                            path.lib+'dialog/6.0.4/dialog-plus.js'
                        ]
                    },
                    {
                        'dest/common.min.js': [
                            path.js+'config.js',
                            path.js+'common.js'
                        ]
                    }
                ]
            }
        }
    });
    // 加载指定插件任务
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    // 默认执行的任务
    grunt.registerTask('default', ['uglify','concat','cssmin','copy']);
};