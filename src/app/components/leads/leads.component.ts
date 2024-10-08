import { Component, OnInit } from '@angular/core';
import { LeadsService } from '../../services/leads.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent implements OnInit {
  leads: any[] = [];

  constructor(private leadsService: LeadsService,private loginService: LoginService,) {}

  ngOnInit(): void {
    this.login()
    this.getLeads();
  }

  getLeads(): void {
     this.leadsService.getLeads().subscribe(
      (response) => {
        console.log('Leads obtidos com sucesso:', response);
        this.leads = response; // Armazena os leads recebidos
      },
      (error) => {
        console.error('Erro ao obter os leads:', error);
      }
    );
  //   this.leads = 
  //   [
  //     {
  //         "Id": 778149,
  //         "Nome": "WANDERSON JOSE DA SILVA",
  //         "Email": "sivawanderson516@gmail.com",
  //         "StatusDescricao": null,
  //         "StatusDescricaoHtml": null,
  //         "DataCadastro": "/Date(1728160502073)/",
  //         "TarefaPendente": null,
  //         "UltimaTarefa": null,
  //         "UltimaTarefaExecutada": null,
  //         "DataOrdenacao": "/Date(-62135589600000)/",
  //         "TipoOrdenacao": 0,
  //         "StatusOrdem": 0,
  //         "Qualificacao": null,
  //         "EmailCamuflado": "si*****16@gmail.com",
  //         "Classe": "quente"
  //     },
  //     {
  //         "Id": 778152,
  //         "Nome": "JOÃO CARLOS PEREIRA",
  //         "Email": "joao.pereira@gmail.com",
  //         "StatusDescricao": null,
  //         "StatusDescricaoHtml": null,
  //         "DataCadastro": "/Date(1728160502084)/",
  //         "TarefaPendente": null,
  //         "UltimaTarefa": null,
  //         "UltimaTarefaExecutada": null,
  //         "DataOrdenacao": "/Date(-62135589600000)/",
  //         "TipoOrdenacao": 0,
  //         "StatusOrdem": 0,
  //         "Qualificacao": null,
  //         "EmailCamuflado": "jo*****ra@gmail.com",
  //         "Classe": "morno"
  //     },
  //     {
  //         "Id": 778153,
  //         "Nome": "MARIA SILVA DE SOUZA",
  //         "Email": "maria.souza@gmail.com",
  //         "StatusDescricao": null,
  //         "StatusDescricaoHtml": null,
  //         "DataCadastro": "/Date(1728160502095)/",
  //         "TarefaPendente": null,
  //         "UltimaTarefa": null,
  //         "UltimaTarefaExecutada": null,
  //         "DataOrdenacao": "/Date(-62135589600000)/",
  //         "TipoOrdenacao": 0,
  //         "StatusOrdem": 0,
  //         "Qualificacao": null,
  //         "EmailCamuflado": "ma*****za@gmail.com",
  //         "Classe": "frio"
  //     }
  // ]
  }

  login(): void {
    this.loginService.login('JOYCEFREITAS', 'Jvf@1985').subscribe(
      (response) => {
        console.log('Login realizado com sucesso', response);

        // // Checa se o login foi bem-sucedido e armazena os cookies/sessão
        // if (response.success) {
        //   document.cookie = `sessionToken=${response.token}; path=/;`;  // Defina o cookie
        //   this.router.navigate(['/dashboard']);  // Navega para outra página após o login
        // } else {
        //   this.loginError = 'CPF ou senha incorretos. Tente novamente.';
        // }
      },
      (error) => {
        console.error('Erro ao fazer login:', error);
        // this.loginError = 'Falha ao acessar o servidor. Tente novamente mais tarde.';
      }
    );
  }

  acceptLead(id: number): void {
    this.leadsService.acceptLead(id).subscribe(
      (response) => {
        console.log(`Lead com ID ${id} aceito com sucesso!`, response);
        // Aqui você pode atualizar a lista de leads ou exibir uma mensagem
      },
      (error) => {
        console.error(`Erro ao aceitar o lead com ID ${id}:`, error);
      }
    );
  }
  
  acceptAllLeads(): void {
    const leadIds = this.leads.map(lead => lead.Id).slice(0, 7); // Coleta apenas os primeiros 7 IDs dos leads
    const acceptPromises = leadIds.map(id => this.leadsService.acceptLead(id).toPromise());

    Promise.allSettled(acceptPromises)
      .then(results => {
        results.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            console.log(`Lead com ID ${leadIds[index]} aceito com sucesso!`, result.value);
          } else {
            console.error(`Erro ao aceitar o lead com ID ${leadIds[index]}:`, result.reason);
          }
        });
        // Aqui você pode atualizar a lista de leads ou exibir uma mensagem de conclusão
      });
  }

  removeLead(id: number): void {
    this.leads = this.leads.filter(lead => lead.Id !== id);
    console.log(`Lead com ID ${id} removido.`);
  }
}
