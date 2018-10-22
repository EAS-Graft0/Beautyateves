angular.module('mobApp').controller('homeCtrl', ['$state', '$scope', '$stateParams', '$ionicPopup', '$ionicModal', '$ionicHistory', '$http', function($state, $scope, $stateParams, $ionicPopup, $ionicModal, $ionicHistory, $http) {
    window.homeCtrlScope = $scope;

    $scope.selectedCat = 'fdsfds';
    $scope.modals = {};

    $scope.categories = [{
        "id": 1,
        "name": "Wax",
        "icon": "https://cdn2.iconfinder.com/data/icons/beauty-and-spa-2-4/65/55-512.png",
        "categoriescol": null
    }, {
        "id": 2,
        "name": "Tattoo",
        "icon": "https://png.icons8.com/metro/1600/tattoo-machine.png",
        "categoriescol": null
    }, {
        "id": 3,
        "name": "Nails",
        "icon": "https://i.pinimg.com/originals/b3/54/ce/b354ce6c6367453b9beb7e3a5bc429f5.png",
        "categoriescol": null
    }, {
        "id": 4,
        "name": "Tan",
        "icon": "https://d30y9cdsu7xlg0.cloudfront.net/png/172469-200.png",
        "categoriescol": null
    }, {
        "id": 5,
        "name": "Makeup",
        "icon": "data:image/jpeg;base64,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",
        "categoriescol": null
    }, {
        "id": 6,
        "name": "Lashes",
        "icon": "https://png.pngtree.com/element_pic/16/11/20/5252b0491c18502fe5e755e8ec1021e1.jpg",
        "categoriescol": null
    }, {
        "id": 7,
        "name": "Eyebrows",
        "icon": "https://previews.123rf.com/images/hedgehogvector/hedgehogvector1611/hedgehogvector161100211/65502607-eyebrow-tweezers-icon.jpg",
        "categoriescol": null
    }, {
        "id": 8,
        "name": "Botox",
        "icon": "http://kalo.com.my/wp-content/uploads/2018/01/kl-icon-botox-02.png",
        "categoriescol": null
    }, {
        "id": 9,
        "name": "Skin",
        "icon": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEBUTExIVFhQXFxUXFhcXFRUdGhcaHhUXFhUYGBUYHSggGBslHRUWITEiJSkrLjIuFx8zODMtNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAAAQYHAgQFCAP/xABHEAABAgMGAwUEBgcHAwUAAAABAAIDETEEBRIhYXEGQVEHEyKBsTJCkaEUI1JicoJDU5KywcLwFSQzk6Kj8dHS4TQ1c4PD/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALvRPog9EtAgZPIIJ5c0qZCqKboGTLdBMkqbopmaoHOVUT5lLUo1KBg8ygH4JV2RXb1QMGeyJz2SrsjQIHPovlarUyGxz3uDWNE3OcZBo6klcbibiyzWJsoj5xJeGEyReekx7o1PzVOcU8UWm2kOieCDiOCG2eCY5k++4TGfKdBNBOWdo0WPeMKBZYTXQXPawlwON4n43jPwANm6RBOWfQTm/wC8vo1lix5YjDY5wE5TIHhE+UzIKDdknDndsNsiN8cQYYIPJnvP/MQJaD7y3+12393YBCn4oz2t/K043HaYaPzINPs/47tFqtRgR2w/ExzmFjSJESm0gkzEic9Oc1Ys5VXnrga3dzeNmead5gOzwYf8wPkvQmpQOfMoB5lLUormaIGCgGeyVdvVV9xZ2kOslqfZxZg4Mw+J0QtxTaHTaMJ8Ocp6FBJbj4ts9rjxYELHihTmXNkHAOwktM6TlWVQu7PovPnDPFLrHaYkcQw8xGubhLy0DE8PyMjP2ZK6eEb9NtsrY3dGGSXCU5jIym10hMHbqg7RPIIJ5BKmQRTdAyfinNY03TAlWqBppJoMSeQSpkKpk9KpU3QFN0U3RTdFMzVAUzNUalGpRqUBqUV2RXZFdvVAV29UnOEqyAqVG+OoNvfBYLA6Tsf1knMa4tllhc7ICdZSNNVB29nt52g/3m0iX34sSIRs32f9SCcX1x3YLPMGMIjh7sLxnaY8LTuQoRb+PLfbXdzYYLmA/YGKJLqXnwwxr/qUhunstskMgxXPjuFQTgZ+y3PyLlLIjrNYrOSBDgwWCZk0ADyFXHpUlBW1k4Eh2eG613pFmB4nQ2uJxE0D4lXuJyk3nzIXN4eup9623G9gZZYUhgaJNawZsgslzNXEdScphZ221Wm+7YIcMFlnYZidGNoYj5ZGIcwB5DmVbVzXXCssBsGE2TWjzcebnHmSg3GMDQAABIAAASAAoAOQVIdql8d/biwGbIA7sdMVYh+Mm/kVrcYX4LHZHxjLvD4YY6vM8OXQZuOjSqd4CuU2y3NxzdDYe9jE54pGYB6lzpA6YkHKvi6otliMZE8LzDhxRpiEx5ggjdq9A8PXkLTZYVo+2wEjo6jx5OBHkoV2yXQXwIdqAzhnA/8AA4+EnZ0h+dfDsavcFkWyOObT3sMfdMhEHk6R/OUFmVzNEV29UV29UV2QFdknMBNBvL5J1yCNAgrns/4YtMC32mJGhYYZD2tcS0h04ocC0A0k3nKoVjUyCKZBFN0BTdal63nBssIxY7wxgqTMzPIADMnQLbpqVwONuG/p1m7rvMD2vD2EiYmAWyIHIhx9UHQuS+oFqh97AiB7Z4TkQQfslrgCKroAcyoxwJwr9AgvD4gfEiOBcQCGiQk0CeZqc9dFJwOZQNNKaaDEmW6VN0yZJUzNUBTM1RqUalGpQA6lFdkV2RXb1QFdvVFdkV2RoEBoEaD/AISe8AHMAATJNAOpKgPFPabBggw7JKNEp3n6Np6g/pDtlryQSziC/wCBYoWOM6VcLRm556Nbz3oOaqpzrbflpkPq7Ow6lkPU/rIpH9ALcuPgq1W+L9Jt73ta6Rk7KI8cgG/omeU+gE5q1bBYocCG2HCYGMbkGtH9fFBrXDcsGxwRBgtkKkn2nu5uceZ9KLoUzKKZmqrbtT4uwNNjgu8bhKM4H2Gkf4Y+84V6DLnkER7QuJfptqkwzgwpthy94z8T5c5kADQDqrQ7PeHPodkGMSjRJPiaZeFn5R8y5Qjsq4V72ILZFb9VDP1QPvvHvfhb+9+FW9XM0Qa15WFseDEhRPYe1zT5iu4qNlQNgtES7reC4eKBELXge82jgNHNMxuCvQ9dvVVd2w3B7NthjLKHGl8Ib/5Z/hQWbZo7YrGvYZsc0Oa4e8CJiWkivpoFW3ZDxDjhmxPd4mTfCJ5sn4mDUEz2OisnQIDQIpkEUyCKboCm6KbopuimZqgKZmqNSoxxzxZ/Z7ITu6710RzhIvwgBoBdnI55hSKxxxEhsiUDmtcAeQIBE9c0H11KYzzSrmaJjPb1QZTQhCDE5ZpalM9SlqUBqUV2RXZaN+W8wbNFjNhmJ3bC4MFXS8sgg3q7eqK7KpHdol5xsoFlbI/ZhRYh+M5fJYix8QWrJzosNp6uZBA0Ihyf8igtC874s8ATjRocMfecATo1tSdlCb77VoDAW2WG6KeT3zYzeR8R2kN1oXd2Tuc7FabTmfaEIEn/ADH1/ZU1ubhCxWUgwoDS/wC2/wAbtwXez+WSCuW3de96kGKTDgHPxAsh7the1E0Jnup3wzwLZbHJ8u9j/rHgeE/cZRm+Z1Uopuim6ApuimZqimZqoPx3x22y4oMAh9plImrYO/Iv+78ehD69oHGYsjDChEG0uGXMQmn3nfe6DzOVa24M4ZiW+0EuLhCacUaJzJJmWgmr3deVTyn8+GeHo942gnE7DixRozs5TzOZ9p55D+CvS57rhWeC2FCbhhtoOZPNzjzJQfeyWZjGNYxoaxgAa0UAAkF9a7eqK7eqK7ICuy+FusjI0N8J4mx7S1w0IllqvvXII0CDzzeNkj3bbpAyiQnB0N3J7fdOxEwR+IK9eHr5h2uzMjQveHiHNjh7TTqD8cjzXB7R+F/pdnxQ2ztEIEslV7auYdTUajUquezzik2K0YXn6iKQIk/cdRsSWlDpsEF603RTdDXCUwZzoev/AIRTM1QFMzVcfiy02qFZHxLLDxxhhk2WKQLhiIbPxEDl60XY1KNSgoLjC9LwjCH9NhuYG4+7xQTDnPDilMZ0ClnCV93w6LZ4brOTZ/A0l0EtaIcgMXeGQmG5jr5qRdonCsa3sg909jXQ3OmHlwBa4NmZtBzGEZS5qUWCz4IUOHOYYxrZ9cLQJy8kH3rt6pznslXb1Tn0QZISkmgxI5lKuyZHwSrt6oCu3qiuyK7I0CA0CNAjQf8ACKZBAUyCKbopuim6ApusYsRrGl7yAAJkkgADc0C4fEvFtmsQ+tfiikZQmSLz0n9kan5qnuJuLbVb34XTbDJGCCyZBPKfOI7+gAglXGnaQXYoNiJAzDo9DqIXT8denIqO8G8GRrc7G4llnB8UQ1eZ5hk/aPV1BqclI+DuzQmUa3CTatgTzP8A8hFB90eZ5K0oUIBoAAa1oAa0AAACmQoEGtdV2woEJsKEwMhtoBz6uceZPUrbrt6ort6orsgK7IrkEaBGgQGgRTIIpkEU3QFN1UXapwl3TzbILfq3n64D3Hk+3L7LjXod8rdpusLRAa5jmvAc1wLXNImCCJES6IK07K+L6WOO7MZQHHmP1RPX7Pw5CdnalULxvws+wRwW4u5eZwnzM2kZ4C7k5vI8xnyMrH7O+MRa2d1GcBaIY/zWj3x97qPPnkEz1KK5miK5miK7eqArt6ort6ort6orkKICuQonPkEtAnTIIHJNJNBiRPZKuyZz2S0CA0CNAjQf8IpkEBTIIpuim6iXGfHEKxAw2Si2kj2Z+FnQxCKfhGZ0qgkF7XtAssMxI8QMGtXHo1ozcdAqp4m7TY8WbLKDBZTGZd4RpyhjaZ1CjR+mXlaffjRT5NY2f7MNv9ZlWdwt2awIAES0yjRa4f0bTo0+2dXZaBBXXDvCFrtrsYBbDJm6NEnI9SJ5xDtl1IVvcLcG2axDE1uOLLOK+WLXCKMGg8yVIWt8gKDoiuZogK5miK7eqK7eqK7ICuyK5BFcgjQIDQIpkEUyCKboCm6KbopuimZqgKZmqNSjUo1KDTve64VpgvhRmzY4ebTycDycKgqh7+ua0XdagMRBBxwYoyxAHIjoRQt16ET9CVzNFzeILjhW2AYUUZVa4e0x3JzTy/jzQcjgbi9luh4XybaGDxs5OFMbPu9RyJ2JlNdvVeeb1u203bagJlr2nFCito8Um34yLT1kcq27wRxjDt0PA6TLQ0eNnJwpjhzq3qKiexISmuQojQI0CNAg4PHVljxLBFh2afeHDk0yc5uIF7QepE96c1G+yO67XAbG75j4cJ2Hu4bwQcQxY3BhzaMxv5KwqZCqYy3QZISTQYnoloEyeQSpkEBTIIpuim64HG3ETbDZTEyMV/hhNPN0qkfZaMz5Dmg4vaHxr9EBgQCDaXDxOyIhA0MubzyHKp5A1lwrcjrfa+6MXDMOiPe6ZcQCMUp+08l3PU6LG5rnj26JGcCSWtfFixHZzMiQNXOIl8TyXR7LrRhvSD94RG/7bnD5tCC6LjuWBZIQhwWBranm5x6udVx/oZLK33vZ4JaI8aHDLvZD3tE9cyt3Uqtu0ngy02mP9JgYXju2tdDLgHDCSZtLvCRnSY85oLIY4OAcCC2okcjrNOu3qvNlgvi0Wc/VR4kPOjXnCTq2eE/Bd+B2j3i0SMZr9XQmfygIL0rsvnaI7WNLnOaxg9pziAB5nIKjrR2j3i4SEZrPww2fzArhR7babXEa18WJGe5wDA58xMmQDQThb8kHoi77zgx24oEVkRoMiWOBAPQy5rapkFB+zXhSPYhFfGLQ+KGAQ2meENxGbjTF4qCe+eU4pugKbpOcGgknUk/1kE6brQv+7jHssaDiwmKxzA7pMSGXMdR0mgyu6+LPGn3MeHFIqGPa4jyBot3Urzvf3D1qsL296A0meB7HgzlKZaRJwqKgL7WHje8IUg21PcByfhf83gn5oPQWpQM8zRUee0y8ftw/8of9VzLw41t8YYX2p4B5Mws8psAJ8ygvW1X1ZmRGwokeEx7pYWOe0OPTIlb1dl5+4a4PtNum6HhEPFJ8VzhkcifCPE50jPpqFf8ACZJoaCSAAJmpkJfFBEO1lrDdryWguD4WAkZtJeAcJ5eHENiqUstpfDe2JDcWPaZtc05gq3+2WNKww2D3o7Z7CHEPrJRzs44eh2ux2xjxm50IMdLNjmteWuH7efUEhBOOAuLBboJDgGx4chEAoQaRGjoenI+U5RTIVXnvhy8Ylgt7XO8JY8w4w+7iwxBrKWIatC9CDLUn5oCm6YEq1SpmapgcygaaSaDEnkEqbpk/FKm6ApuqG7Qr6dare8NmWQyYUMDnIycQOZc6fkGq5+JLd9HsceN7zIby38UpNHxIVL9m93iNeUEOzbDnFdP7vs/6yxBbnB/DrbJY2wiBjcMUU9XuEiJ8wB4RsqV4PiGFeNmnUR2MPm7uz+8vRGpXna9vqbyin9XanOGwjFw+UkHomuZooz2hWK2R7J3dkq5wEQYg0uZIzAJkJTlPPMT2Umrt6orsginA3BzLHBm8NfGePrHSmAK92yfujmeZGwHK7Vbrs7LCYkOBCa/vIYxthsDsyZjEBNWBXIL4W6xw40MwojGvYfaa4TFZjLrNBEuzu57M674EQ2eC6IQ8l7obC7/EcB4iJ0AXx7QeBhaR31maG2hoALcgIjRSZoHjkemR5Sm1ngMhsbDhtDWtEmtaJBo2C+lN0HJ4UhWlljhNtRnHAIdnMyxHBicKnDhmevVdG2WlkGG+I8yaxrnOOgEzlsF9abqN9otp7u7LQSc3NEMfncGEfAn4IN3hriKBbYTosLF4XYHBzZEGQIyBIlIjmuvqVCOx+y4LvLz+kivcNgGw/VhU31KCs4nBFqtd5RI1tI7gOOGTh42Anu4bQDNglWedeZmLBiXVZ3tDXwITmNADWuhsIAAkAARkJLbrmaIrt6oKbui7oLuIXwTChmEIkaUMsbgkIbiPBKUgVacW4bK6E6D9HhNhuEnBrGtnthAkQc56L6suqAI7o7YTBFcJOiBoxOGQli8h8AtyuQogrjhThG22K8j3bwbI4HG4uHibI4AWV7wOIzAlKfWSsfQI0CNAgrLtsjSZZYfV0V3wDAP3iul2OQsNge7m+O8/BjG/wKjvbTF/vMBn2YTnftPl/Ipl2XQsN1werjFd/uuHoAgrftVsQh3k8ikRjInmQWH5sn5q3eErX3lgs8Q5udChz3DQD8wVWXbN/wCuhde4bP8AzIisHs7/APa7MT9g/vukgkWpTA5lLUpjPNA5ppTTQYky3SpmapnLNLUoIp2ouIuqP1JgjYd/DmoZ2LQx9KjuNWwQBsXgn9wKd9ollMS7LSOjA/8AYe2Ifk0qu+x61BtvcwnKJBcBq5rmuHyD0Fz1zNFQPaPBw3naR1c1w/NDafUlX9Xb1VJ9rsKV5T+3Bhu+Bez+VBcV1R+8gQn8nQ2O+LQf4rm3LxXZ7VHiwIRdihTmS2QcA7CSwzpOVZVS4Fj47tsp6QmtJ/D4P5Vp8OcFsslsjWlsVzu8DwGloAYHPD3TM/EZtAFMkEp0CKZBFMgim6Apuim6KbopmaoCmZqq27abxwwYMCebnmI4dGtaWgHcvn+VWTTM/wDCp0P/ALVvwEZwIZnp3UI12e8/B+iCzeFLu+j2KBCcJFsNuIdHHxP/ANRK6tczRFczRFdvVAV29UV29UV29UVyFEBXIURoEaBGgQGgRTIVRTIVRTdBSPa3FneRE/ZhQ2/vP/nVp8EQgy7bLrBhu/abj/mVNdo0bFedqPRzR+zCY3+Cve64AhwITTlghsbtJoH8EFMdrNpx3k4fq4cNmxkX/wA6tjg2zd3d9maaiDDPmWhx9VRt4RTbbweW/p48m6Nc8NZ8Gy+C9EQoYAAGTQAANBkEGVczRMZ7JV29U5z29UGSEIQYnqUtSmRzKVczRB87RBERjmuHhc0tI6giR+RXnyyNi2G8WtAJiQYwbL7YnhkPxtdl+IL0PXb1XwfYoTogiGGwvbkHlrcQHQOlMBB967Kpe2uCBHs7/tQ4jf2XNP8A+nzVtaBV1202WdngRAPYiOadA9s/WGEHW7KY+K64bfsvitOn1hf6PCjt83pHgcQsBjP7p7oLQzEcGB7BDM2U9vE7cLc7FrXOzR4XNsUP8nMDfWGVo9s9hLYlntLaydDJ1Bxw/V/wQWnTdFN1qXRbmxrPCjN/SMY/4tBl5UW3TM1QFMzVGpRqUalBFe0y8HwbuiFhIc8thzHIOPi8y0Eea0+yi42wbGI59uP4jowEhjfV3nopBxTc30yyRIBOEuALCeTgQ5pOkxI6EqsLj4utV2f3S0wC6G0mTScLgCZnA72YjJkkb1QXLXb1RXb1XPuG+YVsgNjQsWAzBDhJwIMi0j/ouhXIUQFchRGgRoEaBAaBFMhVFMhVFN0BTdOlapUzNVjGiBjXPdRoJOgAmUHni+frryij7dqe34xi0L0TLmV554TYY15WefvR2vPk7vD6Fehq5miCL3RwFY4Fp+ksa+YJLGF02MJnm0SnzMpkyUort6ort6ort6oCu3qnPpRKuQonPkEGUkJSTQYkJV29UyJ7JV2QFdkVyCK5BGgQGgUd7Qbv767o7AJua3vB1mw4z5kAjzUipkEOAlKs/nugpTsjvLurf3ZOUZhaPxN8bfkHjzVk9oF0/SLvisAnEaBFZ1LmZkDduJv5lTd92J9gvBzWZGFED4R6tmHw98pA7FX3dN4MjwIcdhm2I0OGk6t3BmDqEEM7Hr3D7I6AT4oLvDqx5LhL82P5KfalU3GndF84pSs8SZy/VPOYH4HD4NHVXGxwIDpggiYlSXIz5oHqUVzNEVzNFB3dpdnba4kCNDfDYx7mCJ7UyDIlzAJtHSU+SCcV29V8LdYoUdpZFhtezo5oI8p03SsNvhR24oMRkRnVjgfLKi2DnkEGvYbFDgwxCgsayG2cg0SAzmfOfNbGgRoFr2+8IUBuKLEZDb1e4AfOpQbGgRTIVUFtHafZhHhwoEN8ZrntaYns5kyGBpE3100U6pugKbopmaopmao1KA1KjnaHeHc3bHdOTnt7po1f4TLUNLj5KR6lVH2xX3jjQ7K05Qhjf+Nw8IOoaZ/nQaXZDd/eW8xCPDBhudPo53gb8i/4K6a7eqhXZNc/dWHvXCTo7sf5BlD8jm78ymtdvVAV29UVyFEVyFEaBAaBPQJaBOmSBppJoMSJ7JVyCZ6KH8d3jeUJ8MWGFiYQcbmsxkOnkCOQlnNBlaONMN6i7xB8M2tMTFmHOhiIJNlmJECvXzltMgvPsa227+0u9cw/TcTTh7vPF3YDfq/wSPzVrcB3heMQRfpsLBLD3ZLMDic8YLeYHhzlz58gllN0U3RTdFMzVBX3a7w93kBtrYJvhCUSXOHOc/ykk7OcVx+yPiUQ3mxxT4Xkugk8n+8z81RrPqrYewEHEAQQQQcxI1Euaofjrhh9htGJkxBecUFwJmw1wE8nN5HpI1BkFpcf8NfTbKcIHfQ5uha5eJhP3gB5gLkdkl8RYsGJZorXf3fCGuIOQOL6t06FuH4EdFu9n3GLbZDEKK4C0sGYp3oHvjXqPOlJiBPb1QFdvVcTiDhSyW3OLD8dBEZ4X6Z+8B0cCF267eqK5CiCqrZ2Vx4bi6yWoT5Y8THDTvIc5/AL4i5OIYeTIsRwHS0MI/3DNW3oEaBBUf8AYXEETJ0WI3e0sA/2iSvtY+yqO92K1WoTNcGJ7j/9j5S+BVrUyFUU3QcK4OELHY5GFCnE/WP8T9ZE5N/KAu7TM1RTM1RqUBqUalGpWteNuhwYTo0ZwZDYJkn5ZcyaAINLii/GWOzPjvzIyhs+28+yP4noASqS4duuLeNuDXknG4xI7+jZzedJzDRuOi+nFnEUW8bSJNdgnggQhmczLMCr3GU/Icpq2eA+FxYrPJ0jGfJ0Vw68mNP2WzO5JKCSQoYDQ1ok1oAAHQZADRZVyFEVyFEaBAaBGgRoEUyFUBTIVTGW6VN0xlugaaSaDEnkEqZBMnkEqboIfaeCyb3bbxGGGbXGHh8WJsIQxJ05YcgfiFMKbopuimZqgKZmqcuZS1KqbtI/tL6eO6+kd3Jnc9z3mGchingyx4p15S5ILZ1K073uuFaoLoUZs2OHmDycDyI5L63eIhhQ+9l3mBuOVMWEYvnNfeu3qg8/cScP2i7rQ0zdhxTgxmzE5U/C8cx6hWHwX2iMtGGDai2HGyAfRkX/ALHaUPLopreNghWiG6FFYHw3VB59CDyI6jNU9xf2dxrPiiWfFGgZkiU4jBqB7Y1HmOaC6jnkEaBUfwl2gR7LKHEnGgUkT42D7jjUfdOXQhXBcl9wLVDx2eIHDmPeYej2nMFB0NAimQqimQqim6ApuimZqimZqjUoDUo1KCZDE4yAzzoB1Krri3tMhw5w7HKI+nenOG38I/SHWm9EEw4h4hs9jh95HfL7EMZvefut/ichzKpTifia0XjGaCCG4pQoLJnM5CntvPWW0l8bvu22XlaCW4orz7cR58LRyxOo0dGjyCt7g7gqBYhi/wASMRJ0UinVsMe63Wp+SDn9nvA4soEeOAbQRkKiECMwDzceZ8hzJnFchRFchRGgQGgRoEaBFMhVAUyFUU3RTdFN0BTdMDmUqZlMDmUDTQhBiT8UqbrIpASz5oFTM1RqUwOZQBzKBalAzzNE5TqiU9vVAq7eqK7eqZz2QeiBVyFEaBM9AjQIIXxd2fQLVN8GUGPUkDwP/G0UP3hn1mqqj2e23baRPHBij2XDNrxofZe3Q+YBXomlKrUvS7IMeEYcaGIjTyPXqDVp1GaCD8Mdp8F4DLWO6iU7wAmG7epZ5zGqnlktcOI3HDiNiA0LHBwOxCrG/eyh4JdZIoI/VxciNBEAz8wN1E43CF5QXT+jRgesOTvnDJQegKZn/hR2/eNLFZZ44ofEFIcMhzp6yyb+YhU8bkvOJkYFrdo8RZf6sl1rp7MbdEI7wMgN5lzg53kxk/mQg0uK+NbTbjg/w4JMhCYT4umM1edKac13OEezSJFlFtc4UOohjKI78R9wae1spzwvwPZbGQ8NMSL+sfKY/A2jB89VJjnt6oNawWGHChiHCY1kNtGtEh/53qVsVyFEz05IPQIFoEaBPQIpRAqZCqKbpylugCW6BU3RTMpgcygDmUC1KYzzKJTzKK7IHNNCECQmhAkFNCAKEIQCQTQgQQmhAJJoQJCaECKCmhAIQhABIJoQJCaECQmhAk0IQIpoQgSEIQf/2Q==",
        "categoriescol": null
    }]

    $scope.treatments = [{
        "id": 1,
        "name": "Forearm Wax",
        "description": "Remove hair from the wrist to the elbow",
        "duration": 15,
        "price": 6,
        "category": "Wax",
        "skill_id": 1,
        "icon": null
    }, {
        "id": 2,
        "name": "Cheek Wax",
        "description": "Removeal of hair from the cheek area",
        "duration": 10,
        "price": 4,
        "category": "Wax",
        "skill_id": 1,
        "icon": null
    }, {
        "id": 3,
        "name": "Chin Wax",
        "description": "Removal of hair from the chin area",
        "duration": 10,
        "price": 4,
        "category": "Wax",
        "skill_id": 1,
        "icon": null
    }, {
        "id": 4,
        "name": "Lip Wax",
        "description": "Removal of hair from the top lip",
        "duration": 10,
        "price": 4,
        "category": "Wax",
        "skill_id": 1,
        "icon": null
    }, {
        "id": 5,
        "name": "Under Arm Wax",
        "description": "Removal of all hair under the arm",
        "duration": 15,
        "price": 6,
        "category": "Wax",
        "skill_id": 1,
        "icon": null
    }, {
        "id": 6,
        "name": "1/2 Leg Wax",
        "description": "Removal of hair (top or bottom)",
        "duration": 20,
        "price": 10.5,
        "category": "Wax",
        "skill_id": 1,
        "icon": null
    }, {
        "id": 7,
        "name": "Full Leg Wax",
        "description": "Removal of hair on front and back of legs",
        "duration": 30,
        "price": 16.5,
        "category": "Wax",
        "skill_id": 1,
        "icon": null
    }, {
        "id": 8,
        "name": "Intimate Waxing",
        "description": "Hollywood wax, all off front/sides and back",
        "duration": 60,
        "price": 25,
        "category": "Wax",
        "skill_id": 1,
        "icon": null
    }, {
        "id": 9,
        "name": "Intimate Waxing",
        "description": "Brazilian wax, small strip left in front, all off back",
        "duration": 45,
        "price": 20,
        "category": "Wax",
        "skill_id": 1,
        "icon": null
    }, {
        "id": 10,
        "name": "Intimate Waxing",
        "description": "California wax, all off front only",
        "duration": 30,
        "price": 15,
        "category": "Wax",
        "skill_id": 1,
        "icon": null
    }, {
        "id": 11,
        "name": "Luxury Pedicure",
        "description": "Foot soak, shape and cuticle work followed by removel of hard skin and polish.",
        "duration": 45,
        "price": 20,
        "category": "Nails",
        "skill_id": 2,
        "icon": null
    }, {
        "id": 12,
        "name": "Manicure With Polish",
        "description": "Soak nails, shape and cuticle work followed by a colour ofbyour choice.",
        "duration": 30,
        "price": 12.5,
        "category": "Nails",
        "skill_id": 2,
        "icon": null
    }, {
        "id": 13,
        "name": "Manicure, No Polish",
        "description": "Soak nails with shape and cuticle work",
        "duration": 20,
        "price": 10,
        "category": "Nails",
        "skill_id": 2,
        "icon": null
    }, {
        "id": 14,
        "name": "Weekend Nails",
        "description": "Full nail glued to the nail bed for extra length",
        "duration": 30,
        "price": 13.5,
        "category": "Nails",
        "skill_id": 2,
        "icon": null
    }, {
        "id": 15,
        "name": "File and Polish, Toes",
        "description": "File nails and polish. Add 2.00 for french polish.",
        "duration": 20,
        "price": 8.5,
        "category": "Nails",
        "skill_id": 2,
        "icon": null
    }, {
        "id": 16,
        "name": "File and Polish, Hands",
        "description": "Shape and polish. Add 2.00 for french polish.",
        "duration": 20,
        "price": 7.5,
        "category": "Nails",
        "skill_id": 2,
        "icon": null
    }, {
        "id": 17,
        "name": "Pedicure and Polish",
        "description": "Foot soak followed by shaping the nail, cuticle work and removal of hard skin.",
        "duration": 45,
        "price": 17.5,
        "category": "Nails",
        "skill_id": 2,
        "icon": null
    }, {
        "id": 18,
        "name": "Express SPL’s",
        "description": "Natural semi permanent lashes treatment takes 1 hour",
        "duration": 60,
        "price": 25,
        "category": "Lashes",
        "skill_id": 7,
        "icon": null
    }, {
        "id": 19,
        "name": "Eye Brow Wax & Shape",
        "description": "Define and shape eyebrows to suit individual.",
        "duration": 15,
        "price": 5,
        "category": "Eyebrows",
        "skill_id": 6,
        "icon": null
    }, {
        "id": 20,
        "name": "French Gel Polish Toes",
        "description": "Gel polish with white tips.",
        "duration": 60,
        "price": 17,
        "category": "Nails",
        "skill_id": 2,
        "icon": null
    }, {
        "id": 21,
        "name": "French Gel Polish Hands",
        "description": "Gel polish with white tips",
        "duration": 60,
        "price": 17,
        "category": "Nails",
        "skill_id": 2,
        "icon": null
    }, {
        "id": 22,
        "name": "Shellac Toes",
        "description": "Gel polish on feet. Shellac,Gelish,OPI or Gelluv available",
        "duration": 45,
        "price": 15,
        "category": "Nails",
        "skill_id": 2,
        "icon": null
    }, {
        "id": 23,
        "name": "Facial",
        "description": "20 minute relaxing facial.",
        "duration": 20,
        "price": 11,
        "category": "Skin",
        "skill_id": 2,
        "icon": null
    }, {
        "id": 24,
        "name": "Gel Nail Enhancement",
        "description": "Nail extensions for that natural look. Add gel polish for 10.00 normally 15.00",
        "duration": null,
        "price": 27.5,
        "category": "Nails",
        "skill_id": 2,
        "icon": null
    }, {
        "id": 25,
        "name": "Acrylic Nail Enhancement",
        "description": "Acrylic nail extensions with shellac. Add gel polish for 10.00 normally 15.00",
        "duration": 150,
        "price": 27.5,
        "category": "Nails",
        "skill_id": 2,
        "icon": null
    }, {
        "id": 26,
        "name": "O.P.I Gel",
        "description": "Gel polish",
        "duration": 45,
        "price": 15,
        "category": "Nails",
        "skill_id": 2,
        "icon": null
    }, {
        "id": 27,
        "name": "Pedicure No Polish",
        "description": "relax with the Pedi spa and get the summer feet for your holiday.",
        "duration": 30,
        "price": 15,
        "category": "Nails",
        "skill_id": 2,
        "icon": null
    }, {
        "id": 28,
        "name": "Gelish",
        "description": "Gelish polish",
        "duration": 45,
        "price": 15,
        "category": "Nails",
        "skill_id": 2,
        "icon": null
    }, {
        "id": 29,
        "name": "Shellac Hands",
        "description": "Gel polish we offer, Shellac Gelish OPI Gelluv",
        "duration": 45,
        "price": 15,
        "category": "Nails",
        "skill_id": 2,
        "icon": null
    }, {
        "id": 30,
        "name": "LVL's",
        "description": "Get the big long lashes you dream of with, Lash volume & lift",
        "duration": 60,
        "price": 25,
        "category": "Lashes",
        "skill_id": 7,
        "icon": null
    }, {
        "id": 31,
        "name": "Mac Evening Make Up",
        "description": "Get that glam look with Mac Evening make up with lashes 25.00",
        "duration": 60,
        "price": 20,
        "category": "Makeup",
        "skill_id": 8,
        "icon": null
    }, {
        "id": 32,
        "name": "Spray Tan",
        "description": "Get that holiday tan in 15 mins",
        "duration": 15,
        "price": 10,
        "category": "Tan",
        "skill_id": 4,
        "icon": null
    }, {
        "id": 33,
        "name": "HD Brows",
        "description": "highlight your brows to create definition",
        "duration": 15,
        "price": 15,
        "category": "Eyebrows",
        "skill_id": 6,
        "icon": null
    }, {
        "id": 34,
        "name": "Eye Brow Wax and Tint",
        "description": "Glam up your eyebrows with a shape and tint",
        "duration": 15,
        "price": 10,
        "category": "Eyebrows",
        "skill_id": 6,
        "icon": null
    }, {
        "id": 35,
        "name": "Weekend Lashes",
        "description": "Individual lashes to add length and volume",
        "duration": 20,
        "price": 15,
        "category": "Lashes",
        "skill_id": 7,
        "icon": null
    }, {
        "id": 36,
        "name": "Hot Stone Massage",
        "description": "30 minute relaxing deap heat treatment.",
        "duration": 30,
        "price": 20,
        "category": "Skin",
        "skill_id": 3,
        "icon": null
    }, {
        "id": 37,
        "name": "Semi Permanent Lashes",
        "description": "Full lashes that are thicker and fuller than semi permanent lashes express lashes",
        "duration": 120,
        "price": 45,
        "category": "Lashes",
        "skill_id": 7,
        "icon": null
    }, {
        "id": 38,
        "name": "Botox",
        "description": "All types of treatment available by Doctor Grahame",
        "duration": null,
        "price": null,
        "category": "Botox",
        "skill_id": 9,
        "icon": null
    }, {
        "id": 39,
        "name": "Semi Permanent Make Up and Tattoos",
        "description": "Eyebrows",
        "duration": null,
        "price": 120,
        "category": "Tattoo",
        "skill_id": 5,
        "icon": null
    }, {
        "id": 40,
        "name": "Semi Permanent Make Up and Tattoos",
        "description": "Eyeliner",
        "duration": null,
        "price": 90,
        "category": "Tattoo",
        "skill_id": 5,
        "icon": null
    }, {
        "id": 41,
        "name": "Semi Permanent Make Up and Tattoos",
        "description": "Lip Enhancement",
        "duration": null,
        "price": 120,
        "category": "Tattoo",
        "skill_id": 5,
        "icon": null
    }, {
        "id": 42,
        "name": "Semi Permanent Make Up and Tattoos",
        "description": "Microblading",
        "duration": null,
        "price": 250,
        "category": "Tattoo",
        "skill_id": 5,
        "icon": null
    }];


    $scope.options = {
        loop: true,
        effect: 'slide',
        speed: 250,
        slidesPerView: 1,
        centeredSlides: true
    }

    $scope.$on("$ionicSlides.sliderInitialized", function(event, data) {
        // data.slider is the instance of Swiper
        $scope.slider = data.slider;
        $scope.selectedCat = $scope.categories[$scope.slider.activeIndex];
    });

    $scope.$on("$ionicSlides.slideChangeStart", function(event, data) {
        console.log('Slide change is beginning');
    });

    $scope.$on("$ionicSlides.slideChangeEnd", function(event, data) {
        // note: the indexes are 0-based
        $scope.activeIndex = data.slider.activeIndex;
        $scope.previousIndex = data.slider.previousIndex;
        $scope.selectedCat = $scope.categories[data.slider.activeIndex];
        $scope.$apply();
    });


    $scope.bookTreatment = (treatment) => {
        $ionicModal.fromTemplateUrl('booking/booking.html', {
            scope: $scope,
            animation: 'slide-in-left'
        }).then(function(modal) {
            $scope.modals.bookingModal = modal;
            $scope.modals.bookingModal.show();
            $scope.selectedTreatment = treatment;
        });
    };


    $scope.selectedTreatment = $scope.treatments[0];

    $scope.months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    $http.get('/api/getCategories').then((categories) => {
        console.log('categories');
        console.log(categories);
    });
    $http.get('/api/getTreatments').then((treatments) => {
        console.log('treatments');
        console.log(treatments);
    });
    $http.get('/api/getRotor').then((rotor) => {
        console.log('rotor');
        console.log(rotor);
    });
    $http.get('/api/getAvailableSlots').then((availableSlots) => {
        console.log('availableSlots');
        console.log(availableSlots);
    });
    $http.get('/api/getAvailability').then((availablity) => {
        console.log('availablity');
        console.log(availablity);
    });
    $http.get('/api/getStaff').then((staff) => {
        console.log('staff');
        console.log(staff);
    });

}])