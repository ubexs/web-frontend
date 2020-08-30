"use strict";$(".leaderboard-ad").remove();var codeToIncludeInRedirect=void 0,serviceMetaInfo=$(".meta-info-for-service").first(),returnUrl=serviceMetaInfo.attr("data-returnurl"),serviceName=serviceMetaInfo.attr("data-service-name");console.log(returnUrl),request("/auth/authenticate-to-service","POST",{returnUrl:returnUrl}).then(function(a){$("h1#service-name-header").show(),console.log("Ok"),codeToIncludeInRedirect=a.code,$("#auth-service-pending").empty(),$("#auth-service-pending").append("\n    <p style=\"margin-top:0;font-size:0.85rem;\">Are you sure you'd like to sign into <span class=\"font-weight-bold\">".concat(xss(serviceName),"</span>?</p>\n    <p style=\"margin-top:1rem;\">This will grant the operators of ").concat(xss(serviceName)," access to:</p>\n    <ul>\n        <li>Your IP Address <span style=\"font-size: 0.75rem;\">(This tells them where you live!)</span></li>\n        <li>Your Username</li>\n        <li>Your UserId</li>\n    </ul>\n    <p style=\"opacity:0.85;margin-top:1rem;font-size:0.75rem;\">They will not have access to your password, or any other sensitive info that isn't listed above. Once granted, you cannot revoke these permissions. Only continue if you trust ").concat(xss(serviceName),".</p>\n    \n    <form method=\"POST\" action=\"").concat(xss(returnUrl),"\" style=\"margin-top:1rem;\">\n        <input type=\"hidden\" name=\"code\" value=\"").concat(xss(codeToIncludeInRedirect),"\">\n        <input class=\"form-control btn btn-success\" type=\"submit\" disabled=\"disabled\" id=\"proceed-to-service\">\n    </form>\n    ")),setTimeout(function(){$("#proceed-to-service").removeAttr("disabled")},2500),setTimeout(function(){$("h1#service-name-header").remove(),$("#auth-service-pending").empty().append("<p>This form has timed-out. Please reload the page to continue.</p>")},240000)})["catch"](function(a){console.error(a),$("title").html("Error - BlocksHub"),$("h1#service-name-header").remove(),$("#auth-service-pending").empty(),$("#auth-service-pending").append("<p>Oops, it looks like there was an error loading this page. Please go back, and try again.</p>");var b=a.responseJSON;if(b){b=b.error;var c=b.code;return"AuthenticationServiceBlacklisted"===c?void $("#auth-service-pending").append("<p style=\"margin-top:2rem;opacity:0.75;font-size:0.85rem;text-align:center;\">Error Code: ".concat(c,"</p>")):"AuthenticationServiceConstraintHTTPSRequired"===c?void $("#auth-service-pending").append("<p style=\"margin-top:2rem;opacity:0.75;font-size:0.85rem;text-align:center;\">Error Code: ".concat(c,"</p>")):"InvalidReturnUrl"===c?void $("#auth-service-pending").append("<p style=\"margin-top:2rem;opacity:0.75;font-size:0.85rem;text-align:center;\">Error Code: ".concat(c,"</p>")):void $("#auth-service-pending").append("<p style=\"margin-top:2rem;opacity:0.75;font-size:0.85rem;text-align:center;\">Error Code: InternalServerError</p>")}});