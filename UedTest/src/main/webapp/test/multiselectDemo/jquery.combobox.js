
(function( $ ) {
  $.widget( "ui.combobox", {
    _create: function() {
      //var options = this.options;//获取参数
      var input,
        that = this,
        select = this.element.hide(),
        selected = select.children( ":selected" ),
        value = selected.val() ? selected.text() : "",
        wrapper = this.wrapper = $( "<span>" )
          .addClass( "ui-combobox" )
          .insertAfter( select );

      function removeIfInvalid(element) {
        var value = $( element ).val(),
          matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( value ) + "$", "i" ),
          valid = false;
          /*
          select.children( "option" ).each(function() {
            if ( $( this ).text().match( matcher ) || $( this ).val().match( matcher ) ) {
              this.selected = valid = true;
              return false;
            }
          });
          */
        if ( !valid ) {
          //console.log( $(select).val() + " "+$(select).find(":selected").text() )
          //select.val( "" );
          //console.log( $(select).val() )
          var _stext = $(select).find(":selected").text() || "所有";
          $( element ).val( _stext );//设置上一次选中的文本和值
          //$(select).trigger("change");
          //setTimeout(function() {
          //  input.tooltip( "close" ).attr( "title", "" );
          //}, 2500 );
          input.data( "autocomplete" ).term = "";
          return false;
        }
      }

      input = $( "<input>" )
        .click(function(){
          input.select();
          //点击文本框显示所有选项
          input.autocomplete( "search", "" );
          //$(this).parent().find("a").trigger("click");
        })
        .appendTo( wrapper )
        .val( value )
        .attr( "title", "" )
        .addClass( "ui-combobox-input element text" )
        .autocomplete({
          delay: 0,
          minLength: 0,
          source: function( request, response ) {
            var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
            response( select.children( "option" ).map(function() {
              var val = $( this ).val();
              var text = $( this ).text();
              //if ( this.value && ( !request.term || matcher.test(text) || matcher.test(val) ) ) //this.value为空也显示select
              if (  ( !request.term || matcher.test(text) || matcher.test(val) ) )
                return {
                  label: (text).replace(
                    new RegExp(
                      "(?![^&;]+;)(?!<[^<>]*)(" +
                      $.ui.autocomplete.escapeRegex(request.term) +
                      ")(?![^<>]*>)(?![^&;]+;)", "gi"
                    ), "<strong>$1</strong>" ),
                  value: text,
                  option: this
                };
            }) );
          },
          select: function( event, ui ) {
            ui.item.option.selected = true;
            that._trigger( "selected", event, {
              item: ui.item.option
            });
            select.trigger("change");
          },
          change: function( event, ui ) {
            if ( !ui.item ){
                return removeIfInvalid( this );
            }else{
            }
          },
          open: function( event, ui ) {
            $('.ui-autocomplete').css('minWidth', '120px');
          },
          maxItems: 40   

        });

      
      input.data( "autocomplete" )._renderItem = function( ul, item ) {
        return $( "<li>" )
          .data( "item.autocomplete", item )
          .append( "<a>" + item.label + "</a>" )
          .appendTo( ul );
      };

      input.val( $(select).find("option:selected").text() );//设置默认值

      $( "<a>" )
        .attr( "tabIndex", -1 )
        .appendTo( wrapper )
        .button({
          icons: {
            primary: "ui-icon-carat-1-n"
          },
          text: false
        })
        .removeClass( "ui-corner-all" )
        .addClass( "ui-combobox-toggle" )
        .click(function() {
          // close if already visible
          if ( input.autocomplete( "widget" ).is( ":visible" ) ) {
            input.autocomplete( "close" );
            removeIfInvalid( input );
            return;
          }

          // work around a bug (likely same cause as #5265)
          $( this ).blur();

          // pass empty string as value to search for, displaying all results
          input.autocomplete( "search", "" );
          input.focus();
        });

        //input.tooltip({
        //    position: {
        //      of: this.button
        //    },
        //    tooltipClass: "ui-state-highlight"
        //  });
    },
    destroy: function() {
      this.wrapper.remove();
      this.element.show();
      $.Widget.prototype.destroy.call( this );
    }
  });
})( jQuery );
