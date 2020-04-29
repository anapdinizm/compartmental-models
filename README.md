#Compartimental models

It's a HTML/JavaScript tool to interact with compartmental models like SIR, SEIR and the compartmental model SEIR considering dead and hospitalized people.

The online version and more explanation about SIR model can be seen here: [https://anapdinizm.github.io/compartmental_model/sir_model.html](https://anapdinizm.github.io/compartmental_model/sir_model.html).

This project is licensed under the terms of the [MIT License](https://mit-license.org/).

<html>
<head>
<script id="MathJax-script" type="text/javascript"
     src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML">
  </script>
</head>

<img src="/compartmental-model/images/sir_model.png" alt="Compartimentos do modelo SIR " title="Compartimentos do modelo SIR" />
<p>
$$\begin{cases}
      \displaystyle \frac{dS}{dt}=-\beta S\frac{I}{N};\\ 
      \displaystyle \frac{dI}{dt}=\beta S\frac{I}{N} - \nu I;\\
      \displaystyle \frac{dR}{dt}=\nu I;
    \end{cases} $$
  Sendo, \(N=S+I+R\) a população total.
</p>
</html>


